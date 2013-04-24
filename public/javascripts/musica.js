/*
 * var url = '/musica/artista/4115';
 * var url = '/musica/album/302127';
 * var url = '/musica/buscar/mana/450';
 *
 */



/*
 * Modelo de las cansiones
 * 
 */
function AppViewModelSong() 
{
	var self = this;
	
    self.song = ko.observableArray([]);
    self.total = ko.observableArray([]);
    self.prev = ko.observableArray([]);
    self.next = ko.observableArray([]);

    self.InputValue = ko.observable('');
    
    
    self.keypressong = function(AppViewModelSong, event) {
    	var url = '/musica/buscar/' + this.InputValue();
		searchMusic(url);
    }

	function searchMusic(url)
		{
			$.getJSON(url, function(data) {

			    self.song.removeAll();
			    self.total.removeAll();
			    self.prev.removeAll();
			    self.next.removeAll();

				$.each(data.data, function(k,v){
					self.song.push({
									      sId : v.id
										, sTitle : v.title
										, sAlbumId : v.album.id
										, sAlbumTitle : v.album.title
										, sAlbumCover : v.album.cover
										, sArtistId : v.artist.id
										, sArtistName : v.artist.name
										, sArtistPicture : v.artist.picture
									}); 
						console.log( 	v.id + ' ' + 
										v.title + ' ' + 
										v.album.id + ' ' + 
										v.album.title + ' ' + 
										v.album.cover + ' ' + 
										v.artist.id + ' ' + 
										v.artist.name + ' ' +
										v.artist.picture);
				});
				if (typeof data.prev != 'undefined')
			    	self.prev.push({ value: '/musica/buscar/' + data.prev.replace('https://api.deezer.com/2.0/search?q=','').replace('&index=','/')});
			    if (typeof data.next != 'undefined')
					self.next.push({ value: '/musica/buscar/' + data.next.replace('https://api.deezer.com/2.0/search?q=','').replace('&index=','/')});
				
			});
		}


}


ko.bindingHandlers.enterKey = {
    init: function(element, valueAccessor, allBindings, vm) {
        ko.utils.registerEventHandler(element, "keyup", function(event) {
            if (event.keyCode === 13) {
                ko.utils.triggerEvent(element, "change");
                valueAccessor().call(vm, vm); 
            }
            
            return true;
        });
    }         
};


var sModel = new AppViewModelSong()
ko.applyBindings(sModel);



