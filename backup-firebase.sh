#!/bin/bash
# Firebase Backup Script for Tennis Coordinator

BACKUP_DIR="./firebase-backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/backup-${TIMESTAMP}.json"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Download backup
echo "Downloading Firebase backup..."
curl -X GET "https://tennis-coordinator-43f53-default-rtdb.firebaseio.com/.json" -o "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "✓ Backup successful: $BACKUP_FILE"
    ls -lh "$BACKUP_FILE"

    # Keep only last 10 backups
    cd "$BACKUP_DIR"
    ls -t backup-*.json | tail -n +11 | xargs rm -f 2>/dev/null
    echo "✓ Old backups cleaned (keeping last 10)"
else
    echo "✗ Backup failed"
    exit 1
fi
