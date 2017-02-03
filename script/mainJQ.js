(function() {

	var pokeImages = document.querySelectorAll('nav li'),
	critterHeader = document.querySelector('.click-header'),
	critterImage = document.querySelector('.pokemon-large'),
	critterDesc = document.querySelector('.content-section p'),
	habHeader = document.querySelector('.habitat-header'),
	critterHab = document.querySelector('.habitat'),
	httpRequest;

	function makeRequest(){
		httpRequest = new XMLHttpRequest();

		if (!httpRequest){

			console.log('Derp.');
			return false;
		}

		httpRequest.onreadystatechange = showPokemonInfo();
		httpRequest.open('GET', 'includes/getPokemon.php' + '?critter=' + this.id);
		httpRequest.send();
	}

	function showPokemonInfo(){

		if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
			//parse stringified result
			var pokeData = JSON.parse(httpRequest.responseText);
			critterHeader.firstChild.nodeValue = pokeData.pokeName;

			[].forEach.call(document.querySelectorAll('.hidden'), function(item){
				item.classList.remove('hidden');
			});

			critterImage.src = "images/" + pokeData.pokeImage + '.png';
			critterDesc.firstChild.nodeValue = pokeData.pokeDesc;
			habHeader.firstChild.nodeValue = pokeData.pokeName + " lives here!";
			critterHab.src = "images/" + pokeData.bgImage + '.jpg';

		}
	}

	//event handlers
	//
	[].forEach.call(pokeImages, function(img) {
		img.addEventListener('click', makeRequest, false);
	});
})();
