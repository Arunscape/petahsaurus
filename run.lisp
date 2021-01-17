#!/usr/bin/sbcl --script
(load "~/.sbclrc")

(ql:quickload '(clack petahsaurus))
(when *swankpath* (load *swankpath*))
(clack:clackup petahsaurus.api:*static-app* :use-thread nil)
