(defpackage :petahsaurus.api
  (:use :cl :util)
  (:export
   #:*app*
   #:*static-app*))

(in-package :petahsaurus.api)

(defvar *app* (make-instance 'ningle:app))

(defun cors (app)
  (lambda (env)
    (let ((domain "*"))
      (if (equal (getf env :REQUEST-METHOD) :OPTIONS)
          `(204
            (:access-control-allow-methods
             "GET, POST, PUT, DELETE, OPTIONS, HEAD"
             :access-control-allow-origin ,domain
             :access-control-allow-headers "Authorization, content-type"
             :access-control-allow-credentials "true")
            nil)
          (let ((r (funcall app env)))
            (list (car r)
                  (append `(:access-control-allow-methods
                            "GET, POST, PUT, DELETE, OPTIONS, HEAD"
                            :access-control-allow-origin ,domain
                            :access-control-allow-headers "Authorization, content-type"
                            :access-control-allow-credentials "true")
                          (cadr r))
                  (caddr r)))))))

(defvar *static-app*
  (lack:builder
   #'cors
   (lambda (app)
     (let ((static (funcall lack.middleware.static:*lack-middleware-static*
                            app
                            :path "/"
                            :root #P"./frontend/build/")))
       (lambda (env)
         ;(funcall static env))))
         (if (starts-with (getf env :path-info) "/api")
             (funcall app env)
             (funcall static env)))))
   *app*))
