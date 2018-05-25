package com.curso.servicio;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.curso.modelo.entidad.Pelicula;
import com.curso.modelo.negocio.GestorPeliculas;
import com.curso.servicio.dto.PeliculaDTO;

@RestController
//@Controller
//Singleton
//SIN ESTADO
public class PeliculasREST {

	@Autowired
	private GestorPeliculas gestorPeliculas;	

	public PeliculasREST() {
		super();
		System.out.println("Creando ServicioPeliculas");
	}

	@RequestMapping(value="peliculas", 
					method=RequestMethod.POST, 
					consumes=MediaType.APPLICATION_JSON_VALUE)
	//@ResponseBody
	public void insertar(@RequestBody PeliculaDTO peliculaDTO){
		System.out.println("ServicioPeliculas. Insertar:"+peliculaDTO);
		Pelicula pelicula = peliculaDTO.asPelicula();		
		gestorPeliculas.insertar(pelicula);
	}
	
	@RequestMapping(value="peliculas", 
					method=RequestMethod.PUT,
					consumes=MediaType.APPLICATION_JSON_VALUE)
	//@ResponseBody
	public void modificar(@RequestBody PeliculaDTO peliculaDTO){
		System.out.println("ServicioPeliculas. Modificar:"+peliculaDTO);
		Pelicula pelicula = peliculaDTO.asPelicula();		
		gestorPeliculas.modificar(pelicula);
	}
	
	@RequestMapping(value="peliculas/{idPelicula}", 
				    method=RequestMethod.DELETE)
	//@ResponseBody
	public void borrar(@PathVariable("idPelicula") Integer idPelicula){
		System.out.println("ServicioPeliculas. Borrar:"+idPelicula);
		Pelicula p = new Pelicula();
		p.setId(idPelicula);
		gestorPeliculas.borrar(p);
	}
	
	@RequestMapping(value="peliculas/{idPelicula}", 
			        method=RequestMethod.GET,
			        produces=MediaType.APPLICATION_JSON_VALUE)
	//@ResponseBody
	public ResponseEntity<PeliculaDTO> buscar(@PathVariable("idPelicula") Integer idPelicula){
		System.out.println("ServicioPeliculas. Buscar:"+idPelicula);
		Pelicula pelicula = gestorPeliculas.buscar(idPelicula);
		if(pelicula==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}		
		return new ResponseEntity<>(new PeliculaDTO(pelicula), HttpStatus.OK);
	}
	
	@RequestMapping(value="peliculas", 
					method=RequestMethod.GET, 
					produces=MediaType.APPLICATION_JSON_VALUE)
	//@ResponseBody
	public List<PeliculaDTO> listar(){
		System.out.println("LISTAR");
		List<Pelicula> peliculas = gestorPeliculas.listar();
		List<PeliculaDTO> peliculasDTO = new ArrayList<PeliculaDTO>();
		for(Pelicula p: peliculas){
			peliculasDTO.add(new PeliculaDTO(p));
		}		
		return peliculasDTO;
	}	
	
}





