<?php
    $inData = getRequestInfo();

    $searchParam = $inData["searchParam"];
    $userId = $inData["userId"];

    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331"); 
    if ($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        if (empty($searchParam)) {
            // If searchParam is empty, return all contacts for the given user ID
            $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID = ?");
            $stmt->bind_param("i", $userId);
        } else {
            // If searchParam is not empty, perform the search on all fields
            $stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID = ? AND (FirstName LIKE ? OR LastName LIKE ? OR Email LIKE ? OR Phone LIKE ?)");
            $searchParam = "%$searchParam%";
            $stmt->bind_param("issss", $userId, $searchParam, $searchParam, $searchParam, $searchParam);
        }

        $stmt->execute();

        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $contacts = array();

            while ($row = $result->fetch_assoc()) {
                $contacts[] = $row;
            }

            returnWithInfo($contacts);
        } else {
            returnWithError("No contacts found for the given user ID");
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj) {
        header('Content-type: application/json');
        echo json_encode($obj);
    }

    function returnWithError($err) {
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($info) {
        $retValue = '{"contacts":' . json_encode($info) . ', "error":""}';
        sendResultInfoAsJson($retValue);
    }
?>