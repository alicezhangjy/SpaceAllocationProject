class Space {
  constructor (rawObject) {
    // const data ={
    //   'id': doc.id,
    //   'serial_no': doc.data().serial_no,
    //   'length': doc.data().length,
    //   'breadth': doc.data().breadth,
    //   'coordX': doc.data().coordX,
    //   'coordY': doc.data().coordY,
    //   'angle': doc.data().angle
    // }
    this.id = rawObject.id;
    this.serial_no = rawObject.serial_no;
    this.length = rawObject.length;
    this.breadth = rawObject.breadth;
    // if (dimensions[0] >= dimensions[1]) {
    //   this.length = dimensions[0];
    //   this.breadth = dimensions[1];
    // } else {
    //   this.length = dimensions[1];
    //   this.breadth = dimensions[0];
    // }
    this.coordX = rawObject.coordX;
    this.coordY = rawObject.coordY;
    this.angle = rawObject.angle;
  }
  setStartCoords(startCoords) {
    this.startX = startCoords[0];
    this.startY = startCoords[1];
    // this.startCoords = startCoords;
  }
}

class Cluster extends Space {
  constructor(rawObject) {
    // const data ={
    //   'id': doc.id,
    //   'serial_no': doc.data().serial_no,
    //   'length': doc.data().length,
    //   'breadth': doc.data().breadth,
    //   'coordX': doc.data().coordX,
    //   'coordY': doc.data().coordY,
    //   'angle': doc.data().angle,
    //   'level': doc.data().level
    // }
    super(rawObject);

    this.level = rawObject.level;
    // TODO: add properties of project (eg name, description all that)
  }
  setDimensions (length, breadth) {
    this.length = length;
    this.breadth = breadth;
  }
  setStartCoords (coordX, coordY) {
    // console.log("setting", coordX, coordY);
    this.coordX = coordX;
    this.coordY = coordY;
  }
  getObject () {
    return {
      'id': this.id,
      'serial_no': this.serial_no,
      'length': this.length,
      'breadth': this.breadth,
      'coordX': this.coordX,
      'coordY': this.coordY,
      'angle': this.angle,
      'level': this.level
    }
  }
}

class Project extends Space {
  constructor(rawObject) {
    // const data ={
    //   'id': doc.id,
    //   'group_no': doc.data().serial_no,
    //   'length': doc.data().length,
    //   'breadth': doc.data().breadth,
    //   'coordX': doc.data().coordX,
    //   'coordY': doc.data().coordY,
    //   'angle': doc.data().angle,
    //   'group_theme': doc.data().theme,
    //   'allocation': doc.data().allocation
    // }
    super(rawObject);

    this.group_theme = rawObject.group_theme;
    this.allocation = rawObject.allocation;
    // TODO: add properties of project (eg name, description all that)
  }
  getAllocation () {
    return this.allocation;
  }
  setAllocation (allocatedCluster) {
    this.allocation = allocatedCluster;
  }
  getObject () {
    return {
      'id': this.id,
      'serial_no': this.serial_no,
      'length': this.length,
      'breadth': this.breadth,
      'coordX': this.coordX,
      'coordY': this.coordY,
      'angle': this.angle,
      'group_theme': this.group_theme,
      'allocation': this.allocation
    }
  }
}

class SpaceList {
  constructor (rawArray, listType) {
    let clusterGroup = [];
    for (let element of rawArray) {
      // const dimensions = [element[0], element[1]];
      // console.log(dimensions);
      if (listType == "cluster") {
        let space = new Cluster(element);
        clusterGroup.push(space);
      } else if (listType == "project") {
        let space = new Project(element);
        clusterGroup.push(space);
      } else {
        // TODO: throw error
      }

    }
    this.clusterGroup = clusterGroup;
    // this.lastIndex = this.cluster.length-1;
    // console.log(this.cluster);
  }
  _increasingBreadthSorter(space1, space2) {
    if (space1.breadth == space2.breadth) {
      return 0;
    } else {
      return space1.breadth < space2.breadth ? -1:1;
    }
  }
  _decreasingBreadthSorter(space1, space2) {
    if (space1.breadth == space2.breadth) {
      return 0;
    } else {
      return space1.breadth > space2.breadth ? -1:1;
    }
  }
  sortByBreadth(key) {
    if (key=="decreasing") {
      this.clusterGroup.sort(this._decreasingBreadthSorter);
    } else {
      this.clusterGroup.sort(this._increasingBreadthSorter);
    }
  }
  _indexSorter(space1, space2) {
    if (space1.index == space2.index) {
      return 0;
    } else {
      return space1.index < space2.index ? -1:1;
    }
  }
  sortByIndex() {
    this.clusterGroup.sort(this._indexSorter);
  }
  getCluster () {
    // console.log(this.cluster);
    return this.clusterGroup;
  }
  // setCluster (clusterList) {
  //   this.clusterGroup = clusterList;
  // }
  pushSpace (spaceObject) {
    let space = new Cluster(spaceObject);
    this.clusterGroup.push(space);
  }
  removeSpace (spaceObject) {
    let space = new Cluster(spaceObject);
    this.clusterGroup.remove(space); // TODO: CHECK SYNTAX!!
  }
}

// var inputSpaces = [[10,3,0], [8,6,0], [5,5,0], [9,5,0], [12,6,-45], [12,6,0], [20,7,0], [13,5,0], [10,5,0], [5,5,0], [14,4,225], [28,3,0], [28,5,210], [28,4,-30]];
// var inputProjects = [[10,2,0], [11, 3, 0]];
/** testCases:
  1) Complete fit:
    var inputSpaces = [[2,2,0]];
    var inputProjects = [[1,1,0], [1,1,0], [1,1,0], [1,1,0]
  2) Partial fit (all same size):
    var inputSpaces = [[2,2,0]];
    var inputProjects = [[1,1,0], [1,1,0], [1,1,0], [1,1,0], [1,1,0]]
  3) Partial fit (prioritising large projects):
    var inputSpaces = [[1,2,0], [2,1,0]];
    var inputProjects = [[1,1,0], [1,1,0], [1,1,0], [1,1,0], [1,2,0]]
*/

// var spaceList = new SpaceList(inputSpaces, "space");
// var projectsList = new SpaceList(inputProjects, "project");
// console.log(spaceList);
// console.log(projectsList);

function allocateSpace(spaceList, projectsList) {
  projectsList.sortByBreadth("decreasing");
  spaceList.sortByBreadth();
  // console.log(spaceList);
  // let spacesCount = spaceList.getCluster().length;

  for (let project of projectsList.getCluster()) {
    // console.log(project);
    for (let space of spaceList.getCluster()) {
      // console.log(space);
      if (project.length > space.length || project.breadth > space.breadth) {
        continue;
      }

      // console.log("slot found!!");
      project.setAllocation(space.serial_no);
      project.coordX = space.coordX;
      project.coordY = space.coordY;
      project.angle = space.angle;

      if (project.length == space.length && project == space.breadth) {
        // spaceList.sortByIndex();
        let removeIndex = spaceList.getCluster().indexOf(space);
        spaceList.clusterGroup.splice(removeIndex, 1);
        // spaceList.remove(space);
      } else if (project.length == space.length) {
        space.breadth -= project.breadth;
        space.coordY += project.breadth;
        // console.log("cut breadth", space.coordX, space.coordY);
      } else if (project.breadth == space.breadth) {
        space.length -= project.length;
        space.coordX += project.length;
        // console.log("cut length", space.coordX, space.coordY);
      } else {
        // spaceList.lastIndex ++;
        let projectObject = project.getObject();
        let clusterObject = space.getObject();
        let newSpace = new Cluster(clusterObject);
        newSpace.setDimensions(projectObject.length, clusterObject.breadth - projectObject.breadth)
        newSpace.setStartCoords(clusterObject.coordX, clusterObject.coordY + projectObject.breadth);
        // console.log(newSpace);
        spaceList.pushSpace(newSpace);
        space.length -= project.length;
        space.coordX += project.length;
        // console.log(space);
      }
      spaceList.sortByBreadth();
      break;
    }
  }
}
// console.log(spaceList);
// allocateSpace(spaceList, projectsList);
// spaceList.sortByIndex();
// projectsList.sortByIndex();
// console.log(spaceList);
// console.log(projectsList);
module.exports = { allocateSpace, SpaceList };