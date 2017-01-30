var FLOOR_ID = "56";
var FILENAME = "floor_4_35.json";

// Create a map
var MAP = Maze.map('mazemap-container', { campusloader: false });
// map.setView([10.406426561608821,63.417421008760335], 15);
MAP.setView([63.417421008760335,10.406426561608821], 15);

// Uncomment the preferred JSON file
getLocalJSON(FILENAME);
getJSONfromServer();

zoom();

function createglobalMergedPolygons(data, roomCoordinates){
    var neighbors;
    var indeces;

    alterJSONfile(data, FLOOR_ID);

    //drawPolygonFromOnlyCoordinates(simpleMergeTwo(simpleMergeTwo(roomCoordinates[19], roomCoordinates[26]), roomCoordinates[31], true), "gray", "black");

    //checkPointSequence(simpleMergeTwo(roomCoordinates[19], roomCoordinates[26]));
    //drawPolygonFromOnlyCoordinates(roomCoordinates[0], "gray", "black");


    //drawPolygonFromOnlyCoordinates(roomCoordinates[0], "gray", "black");

    [neighbors, indeces] = getNeighbors(data, roomCoordinates);

    oldNeighbors = deepCopy(neighbors);

    oldNeighbors = makeNeighborsWhoAreNotNeighborsNeighbors(oldNeighbors);

    console.log(deepCopy(roomCoordinates));
    var oldRooms = deepCopy(roomCoordinates);

    [roomCoordinates, container, globalMergedRoomNameMarkers] = mergeAllPolygons(neighbors, indeces, roomCoordinates);

    [roomCoordinates, container] = removeDuplicateRooms(roomCoordinates, container, globalMergedRoomNameMarkers);


    orderedRooms = findOrderOfRooms(oldNeighbors, container);

    dynamicMergedRooms = dynamicMergeAllRooms(orderedRooms);

    globalZoomLevels = fillZoomLevels(dynamicMergedRooms, oldRooms);

    console.log("dynamicMergedRooms");
    console.log(dynamicMergedRooms);
    console.log(globalZoomLevels);

    roomCoordinates = simplifyRoomsMadeBySomeDude(roomCoordinates);

    fillglobalMergedPolygons(roomCoordinates, globalMergedPolygons, container);

    for (var i = 0; i < globalZoomLevels[0].length; i++) {
        drawPolygonFromOnlyCoordinates(globalZoomLevels[0][i], "white", "gray");
    }

    for (var i = 0; i < globalZoomLevels[1].length; i++) {
        drawPolygonFromOnlyCoordinates(globalZoomLevels[1][i], "white", "red");
    }

    for (var i = 0; i < globalZoomLevels[2].length; i++) {
        drawPolygonFromOnlyCoordinates(globalZoomLevels[2][i], "white", "blue");
    }


}
