function processMatrix(fromLine, fromColumn) {
	
        var allTextLines = matrix.split(/\r\n|\n/);
        var lines = [];
        for (var i=fromLine; i<allTextLines.length; i++) {
            var data = allTextLines[i].split('\t');
                var tarr = [];
                for (var j=fromColumn; j<data.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
        }
      console.log(lines);
	  return lines;
}

function getMatrixHeaders(fromColumn) {
	    var allTextLines = matrix.split(/\r\n|\n/);        
		var data = allTextLines[0].split('\t');
        var tarr = [];
        for (var j=fromColumn; j<data.length; j++) {
                    tarr.push(data[j]);
        }
		console.log(tarr);
		return tarr;
}

function getMatrixTypes(fromColumn) {
	    var allTextLines = matrix.split(/\r\n|\n/);        
		var data = allTextLines[1].split('\t');
        var tarr = [];
        for (var j=fromColumn; j<data.length; j++) {
                    tarr.push(data[j]);
        }
		console.log(tarr);
		return tarr;
}

function getMatrixTopics(fromRow) {
	    var allTextLines = matrix.split(/\r\n|\n/);        
        var tarr = [];
        for (var j=fromRow; j<allTextLines.length; j++) {
				var data = allTextLines[j].split('\t');
				tarr.push(data[0]);
        }
		console.log(tarr);
		return tarr;
}