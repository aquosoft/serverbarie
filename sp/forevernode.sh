#!/bin/bash
### BEGIN INIT INFO
# Provides:          javier
# Required-Start:    $syslog
# Required-Stop:     $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: inicio start node forever
# Description:
#
### END INIT INFO


NAME=serverbarie                                                               # Unique name for the application
SOUREC_DIR=~/serverbarie                                                         # Location of the application source
COMMAND=node                                                                            # Command to run
SOURCE_NAME=app.js                                                                      # Name os the applcation entry point script
USER=root                                                                               # User for process running
NODE_ENVIROMENT=production                                                              # Node environment

pidfile=/var/run/$NAME.pid
logfile=/var/log/$NAME.log
forever=forever

start() {
    export NODE_ENV=$NODE_ENVIROMENT
    echo "Starting $NAME node instance : "
    echo "Starting $NAME node instance : "

    touch $logfile
    chown $USER $logfile

    touch $pidfile
    chown $USER $pidfile

#       iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
#   sudo -H -u $USER $forever start --pidFile $pidfile -l $logfile -a --sourceDir $SOUREC_DIR -c $COMMAND $SOURCE_NAME
#       sudo forever --uid "appjs_desa" start -a -l forever.log -o out.log -e err.log app.js
        sudo -H -u $USER $forever --uid $NAME start --pidFile $pidfile -l $logfile -a --sourceDir $SOUREC_DIR -c $COMMAND $SOURCE_NAME


    RETVAL=$?
}

restart() {
    echo -n "Restarting $NAME node instance : "
    sudo -H -u $USER $forever restart $SOURCE_NAME
    RETVAL=$?
}
status() {
    echo "Status for $NAME:"
    sudo -H -u $USER $forever list
    RETVAL=$?
}

stop() {
    echo -n "Shutting down $NAME node instance : "
    sudo -H -u $USER $forever stop $NAME
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        echo "Usage:  {start|stop|status|restart}"
        exit 1
        ;;
esac
exit $RETVAL