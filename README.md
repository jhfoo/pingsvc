# pingsvc
Node-based REST ping server

### Install
~~~ sh
npm i pingsvc
~~~

### Usage
~~~ node
// to ping 192.168.0.13 in browser
// assuming service runs in 192.168.0.32
http://192.168.0.32:8085/ping/192.168.0.13
~~~

### Notes
1. Must run as root for ping to work
2. Default service port 8085; change in <code>config.json</code>
