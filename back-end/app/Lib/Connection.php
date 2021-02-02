<?php

namespace App\Lib;

class Connection {

    protected $_host;
    protected $_user;
    protected $_dbname;
    protected $_password;
    protected $_port;
    protected $_transaction = false;
    protected $_connection;

    function __construct() {

        $this->_host = env('DB_HOST');
        $this->_user = env('DB_USERNAME');
        $this->_dbname = env('DB_DATABASE');
        $this->_password = env('DB_PASSWORD');
        $this->_port = env('DB_PORT');
    }

    public function getTransaction() {
        return $this->_transaction;
    }

    public function setTransaction($transaction) {
        $this->_transaction = $transaction;
        return $this;
    }

    public function get_host() {
        return $this->_host;
    }

    public function get_user() {
        return $this->_user;
    }

    public function get_dbname() {
        return $this->_dbname;
    }

    public function get_password() {
        return $this->_password;
    }

    public function get_port() {
        return $this->_port;
    }

    public function set_host($_host) {
        $this->_host = $_host;
    }

    public function set_user($_user) {
        $this->_user = $_user;
    }

    public function set_dbname($_dbname) {
        $this->_dbname = $_dbname;
    }

    public function set_password($_password) {
        $this->_password = $_password;
    }

    public function set_port($_port) {
        $this->_port = $_port;
    }

    private function getConnection() {

        $dbname = empty($this->_dbname) ? '' : 'dbname=' . $this->_dbname;
        $con_string = "host=$this->_host  
                       port=$this->_port
                       $dbname
                       user=$this->_user 
                       password=$this->_password";

        $this->_connection = empty($this->_connection) ? pg_connect($con_string) : $this->_connection;
        return $this->_connection;
    }

    private function closeConnection() {
        pg_close($this->_connection);
        $this->_connection = null;
    }

    public function beginTransaction() {
        $this->setTransaction(true);
        $this->getConnection();
        $this->onlyExecute("BEGIN TRANSACTION;");
    }

    public function rollBackTransaction() {
        $this->onlyExecute("ROLLBACK TRANSACTION;");
        $this->closeConnection();
    }

    public function commitTransction() {

        $this->onlyExecute("COMMIT TRANSACTION;");
        $this->closeConnection();
    }

    public function executeWithReturnAll($sql) {

        try {

            $connection = $this->getConnection();
            $result = pg_query($connection, $sql);
            $result = pg_fetch_all($result);
            if (!$this->_transaction) {
                $this->closeConnection();
            }

            return $result;
        } catch (Exception $e) {

            return $e;
        }
    }

    public function executeWithReturnRow($sql) {

        try {

            $connection = $this->getConnection();
            $result = pg_query($connection, $sql);
            $result = pg_fetch_row($result);
            if (!$this->_transaction) {
                $this->closeConnection($connection);
            }
            return $result;
        } catch (Exception $e) {

            return $e;
        }
    }

    public function onlyExecute($sql) {

        try {
            $connection = $this->getConnection();
            $result = pg_query($connection, $sql);
            if (!$this->_transaction) {
                $this->closeConnection($connection);
            }

            return false;
        } catch (Exection $e) {
            return $e;
        }
    }

    public function executeWithReturnOfObject($sql) {

        try {

            $connection = $this->getConnection();
            $result = pg_query($connection, $sql);
            $result = pg_fetch_object($result);
            if (!$this->_transaction) {
                $this->closeConnection($connection);
            }
            return $result;
        } catch (Exception $e) {

            return $e;
        }
    }

}