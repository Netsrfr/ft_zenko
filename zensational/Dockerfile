FROM ubuntu

COPY ./Zensational /usr/src/app
ENV TF_CPP_MIN_LOG_LEVEL=2
RUN apt-get update; \
	apt-get install -y python3-pip python3-dev python-virtualenv git curl; \
	curl -sL https://deb.nodesource.com/setup_8.x | bash -; \
	apt-get install -y nodejs; \
	apt-get install -y npm; \
	apt-get install -y default-jdk; \
	npm install aws-sdk; \
	pip3 install --upgrade pip; \
	pip3 install --upgrade tensorflow; \
	git clone https://github.com/tensorflow/models.git; \
	cd /models/tutorials/image/imagenet; \
	python3 classify_image.py; \
	cd /usr/src/app
CMD ["java", "-cp", "/usr/src/app/libs/*:.", "ZensationalConsumer", "zensational"]
WORKDIR /usr/src/app