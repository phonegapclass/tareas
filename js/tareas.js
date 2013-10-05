//Acciones de tareas
function accesoBD(){//Acceso y Creación de la Base de Datos
	var bd = window.openDatabase("tareasBD","1.0","Tareas BD",200000);
	return bd;
}

function crearTabla(){
	accesoBD().transaction(function(tx){
		tx.executeSql("CREATE TABLE IF EXISTS tareas (tId unique,tarea,estado)");
	},function(err){
		navigator.notification.alert("Error: "+err.code,null,"Error al crear tabla","Aceptar");
	},function(){
		aux=null;
	});
}

function agregarIncompletas(texto,estado){
	accesoBD().transaction(function(tx){//Transacción
		tx.executeSql('INSERT INTO tareas (tarea,estado) VALUES ("'+texto+'","'+estado+'")');
	},function(err){//Error
		navigator.notification.alert("Error: "+err.code,null,"Error agregando Tarea","Aceptar");
	},function(){//Satisfactoria
		navigator.notification.alert("La tarea se ha agregado satisfactoriamente",function(){
			jQT.goBack();
			$('#add form').get(0).reset();
			leerTareas();
		},"Tarea Agregada","Aceptar");
	});
}

function leerTareas(){
	accesoBD().transaction(function(tx){
		tx.executeSql('',[],function(tx2,res){
			var l=res.rows.length;
			$(',complete').html('');
			$(',incomplete').html('');
			for(i=0;i<l;i++){
				if(res.rows.item(i).estado==0){
					$('#home .incomplete').append($('<li relId="'+res.rows.item(i).tId+'"><input type="checkbox" /> <span>' + res.rows.item(i).tarea + '</span></li>'));
				}else{
					$('#home .complete').append($('<li relId="'+res.rows.item(i).tId+'"><input type="checkbox" checked /> <span>' + res.rows.item(i).tarea + '</span></li>'));
				}
			}
		},function(err){
			navigator.notification.alert("Error: "+err.code,null,"Error al leer","Aceptar");
		});
	},function(err){
		navigator.notification.alert("Error: "+err.code,null,"Error al Leer","Aceptar");
	},function(){
		aux=null;
	});
}

function cambiarCompletas(tId){
	accesoBD().transaction(function(tx){
		tx.executeSql('UPDATE tareas SET estado=1 WHERE tId='+tId);
	},function(err){
		navigator.notification.alert("Error: "+err.code,null,"Error al Completar","Aceptar");
	},function(){
		aux=null;
	});
}

function cambiarIncompletas(tId){
	accesoBD().transaction(function(tx){
		tx.executeSql('UPDATE tareas SET estado=0 WHERE tId='+tId);
	},function(err){
		navigator.notification.alert("Error: "+err.code,null,"Error al Regresar Estado","Aceptar");
	},function(){
		aux=null;
	});
}