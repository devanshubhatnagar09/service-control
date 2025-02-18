FOLDER_NAME="$4"
cd ../../docker-dev-setup/$FOLDER_NAME
echo "Entered in $FOLDER_NAME $SERVICE_NAME ....."
git stash
echo "git stash done ....."
echo "Your changes have been stashed as you are checking out to a new branch."
echo "To restore your changes later, use 'git stash pop' when you checkout back to the same branch."
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

if [ "$2" = "enabled" ] && { [ "$3" = "backend" ] || [ "$3" = "frontend" ]; }; then
    # Commands for the "enabled" condition
    docker-compose -f docker-compose-mac-"$SERVICE_NAME".yml down
    echo "$SERVICE_NAME service down ....."
    docker-compose -f docker-compose-mac-"$SERVICE_NAME".yml --compatibility up --build -d
    echo "$SERVICE_NAME service up ....."
    docker restart "$SERVICE_NAME"
    exit 0
else
    # Commands for the "enabled" condition in the "else" block
    if [ "$2" = "enabled" ]; then
        docker-compose -f docker-compose-mac.yml down
        echo "$SERVICE_NAME service down ....."
        docker-compose -f docker-compose-mac.yml --compatibility up --build -d
        echo "$SERVICE_NAME service up ....."
        docker restart "$SERVICE_NAME"
        exit 0
    fi
fi

