#!/usr/bin/sbcl --script
(load "~/.sbclrc")

(defvar *swankpath* nil)
(ql:quickload '(clack petahsaurus))
(when *swankpath* (load *swankpath*))
(clack:clackup petahsaurus.api:*static-app* :use-thread nil)
