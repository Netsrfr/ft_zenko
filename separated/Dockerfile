FROM linuxbrew/linuxbrew

USER root
RUN	mkdir /home/linuxbrew/.ssh; \
	touch /home/linuxbrew/.ssh/known_hosts; \
	ssh-keyscan -H github.com > /home/linuxbrew/.ssh/known_hosts; \
	apt-get update; \
	apt-get install -y nano vim python3-pip python3-dev python-virtualenv wget python-setuptools

USER linuxbrew
RUN	pip3 install --upgrade pip; \
	cd models/tutorials/image/imagenet; \
	python3 classify_image.py; \
	brew update; \
	brew install python python3 numpy node awscli kafka; \
	pip3 install --upgrade tensorflow; \
		git clone https://github.com/tensorflow/models.git; \
	git clone https://github.com/scality/S3.git ~/replication/s3; \
	mkdir ~/kafka && \
    cd ~/kafka && \
    curl http://apache.claz.org/kafka/0.11.0.0/kafka_2.11-0.11.0.0.tgz | tar xvz && \
    sed 's/zookeeper.connect=.*/zookeeper.connect=localhost:2181\/backbeat/' \
    kafka_2.11-0.11.0.0/config/server.properties > \
    kafka_2.11-0.11.0.0/config/server.properties.backbeat

#awscli should be brew installed remove apt if installed
#s3cmd may require repeated install until success
#PIP INSTALL TENSORFLOW!!! Probably before git models