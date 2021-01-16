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
                        ((:file "api"))))
  :description "the petahasaurus server")
