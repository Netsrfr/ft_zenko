const spawnSync = require('child_process').spawnSync;

var aws = require('aws-sdk');
var ACCESS_KEY = process.env.ACCESS_KEY;
var SECRET_KEY = process.env.SECRET_KEY;
var ENDPOINT = process.env.ENDPOINT;
var BUCKET = process.env.BUCKET;

aws.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
});

var s3 = new aws.S3({
    endpoint: ENDPOINT,
    s3ForcePathStyle: true,
});

class   TensorTag {

        /*
        * @constructor
        * @param {string} tag - contains the tags and score of the tags seperated by a ':'
        */

        constructor(tag)
        {
                var tag_split = tag.split(":");
                this.tags = tag_split[0].split(", ");
                this.score = parseFloat(tag_split[1]);
        }
}

/*
* @param {string} image - name of image to be identified
* @return {Tensor Tag array} tags - array of tags identified in the image
*/
function        generateTags(image)
{
        const py = spawnSync('python3',
                ['/models/tutorials/image/imagenet/image_handler.py', '--image_file', image]);
        if (py.stderr.toString()) {
                console.log(py.stderr.toString());
                return (null);
        }

        var tag_list = py.stdout.toString().split("\n");
        var tags = [];
        tag_list.forEach(function(tag){
                tags.push(new TensorTag(tag));
        });
        return (tags);
}

/*
    Takes in input as such
    node tag.js (object key) (tag key) (tag value)

*/

/*
* @param {string} objectKey - key corresponding to the s3 object that will be tagged
* @param {string} tagKey - key corresponding with the tag
* @param {string} tag - tag generated by Tensor Flow
*/

function tagObject(ojectKey, tagKey, tag)
{
    console.log('Object key: '  + objectKey + ' with the tag key: ' + tagKey + ' and tag value: ' + tag);
    params = {
        Bucket: BUCKET,
        Key: objectKey,
        Tagging: {
            TagSet: [
                {
                    Key: tagKey,
                    Value: tag
                }]
        }
    };
/*    s3.putObjectTagging(params, function(err, data){
        if (err) console.log(err, err.stack);
        else console.log("Tag added");
    });*/
}

//var tag_list = generateTags("/test_images/hqdefault.jpg"); //puppy test
//var tag_list = generateTags(""); //panda test
var tag_list = generateTags(process.argv[2]); //banana test
var objectKey = 'null';
var i = 1;

if (ACCESS_KEY && SECRET_KEY && ENDPOINT && BUCKET && tag_list && tag_list[0]) {
        tag_list[0].tags.forEach(function(tag){
                tagObject(objectKey, "ImageNetTag" + i, tag);
                i++;
        });
} else {
    console.log('\nError: Missing S3 credentials or arguments!\n');
}
