(defpackage :petahsaurus-asd
  (:use :cl :asdf))

(in-package :petahsaurus-asd)

(defsystem petahsaurus
  :version "0.0.0"
  :license "AGPL"
  :depends-on (:ningle
               :cl-dbi
               :jose
               :lack-middleware-static
               :lack
               :cl-smtp
               :cl+ssl
               :cl-json)
  :components ((:module "backend"
                        :components
                        ((:file "util")
                         (:file "db")
                         (:file "token")
                         (:file "api")
                         (:file "findings")
                         (:file "signin"))))
  :description "the petahasaurus server")
