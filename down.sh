cd ../../docker-dev-setup/micro-services/admin
/Users/devanshu.bhatnagar/docker-dev-setup/micro-services/admin
echo "Entered in Admin $SERVICE_NAME ....."
git fetch
echo "git fetch done ....."
BRANCH_NAME="$1"
SERVICE_NAME="$3"
if [ -z "$BRANCH_NAME" ]; then
    echo "No branch name provided. Please provide a branch name as an argument."
    exit 1
fi
git checkout $BRANCH_NAME
echo "git checkout $BRANCH_NAME branch done....."
git pull origin $BRANCH_NAME
echo "git pull origin $BRANCH_NAME done ....."

if [ "$2" = "enabled" ]; then
    docker-compose -f docker-compose-mac-$SERVICE_NAME.yml down
    echo "$SERVICE_NAME service down ....."
    docker-compose -f docker-compose-mac-$SERVICE_NAME.yml --compatibility up --build -d
    echo "$SERVICE_NAME service up ....."
    docker restart "$SERVICE_NAME"
    exit 1
fi
