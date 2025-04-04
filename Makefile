# Makefile

# Default target
all: get-branch update-js commit-push

# Get the current Git branch and store it in a variable
get-branch:
	$(eval BRANCH := $(shell git rev-parse --abbrev-ref HEAD))

# Update the JavaScript file with the branch name and print message
update-js: get-branch
	@echo "You are using the $(BRANCH) branch"
