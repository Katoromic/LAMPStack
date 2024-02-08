<?php
    $inData = getRequestInfo();

    $contactId = $inData["contactId"];
    $fieldToUpdate = $inData["fieldToUpdate"];
    $newValue = $inData["newValue"];
    $userId = $inData["userId"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        // Update contact field by ID and UserID
        $stmt = $conn->prepare("UPDATE Contacts SET $fieldToUpdate = ? WHERE ID = ? AND UserID = ?");
        $stmt->bind_param("sii", $newValue, $contactId, $userId);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            returnWithInfo("Contact updated successfully");
        } else {
            returnWithError("No contact found with the specified ID for the given user ID");
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err) {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($info) {
        $retValue = '{"info":"' . $info . '", "error":""}';
        sendResultInfoAsJson($retValue);
    }
?>