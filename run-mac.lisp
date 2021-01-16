#!/usr/local/bin/sbcl --script



;;; The following lines added by ql:add-to-init-file:
#-quicklisp
(let ((quicklisp-init (merge-pathnames ".quicklisp/setup.lisp"
                                       (user-homedir-pathname))))
  (when (probe-file quicklisp-init)
    (load quicklisp-init)))

(ql:quickload '(clack petahsaurus))
(clack:clackup petahsaurus.api:*static-app* :use-thread nil)
