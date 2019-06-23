// ("#download_1").click(function() {
//     var json_pre = '[{"Id":"Header A1","UserName":"Header B1"},{"Id":1,"UserName":"Sam Smith"},{"Id":2,"UserName":"Fred Frankly"},{"Id":1,"UserName":"Zachary Zupers"}]';
//     var json = $.parseJSON(json_pre);
    
//     var csv = JSON2CSV(json);
//     var downloadLink = document.createElement("a");
//     var blob = new Blob(["\ufeff", csv]);
//     var url = URL.createObjectURL(blob);
//     downloadLink.href = url;
//     downloadLink.download = "data.csv";
    
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//     });