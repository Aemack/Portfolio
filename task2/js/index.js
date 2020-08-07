$("#submit").click(function(){
    
    $.ajax({url: "php/task2.php",
        type: 'POST',
        datatype: 'json',
        data:{ 
            country:$("#countries").val(),
            lang:$("#langs").val()
        },
        success: function(result){
            console.log(result)
            obj = JSON.parse(result);
            console.log(obj)
            $("#capital").html(`Capital: ${obj.capital}`);
            $("#continent").html(`Continent: ${obj.continent}`);
            $("#population").html(`Population: ${obj.population}`);
            $("#area").html(`Area: ${obj.areaInSqKm}Km&sup2;`);
    }});
  });

