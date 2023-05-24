FROM mongo

COPY db.dump /db.dump
CMD mongorestore --host mongodb --db emailer --archive=db.dump
