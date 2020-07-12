#! /usr/bin/env python

from gevent import monkey, signal
monkey.patch_all()
from gevent.event import Event
from gevent.pool import Group
from gevent import pywsgi

from app import create_app

from flask_script import Manager, prompt_bool, Server as _Server, Option

application = create_app()

manager = Manager(application)

@manager.command
def run():
    application.run()

if __name__ == '__main__':
    manager.run()
