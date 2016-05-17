(function() {
	'use strict';

	angular.module('app')
		.controller('ChatController', function(ChatFactory, $scope, $log) {
			var vm = this;
			vm.mensagens = [];
			vm.usuario = {
				nome: ''
			};

			vm.entrar = entrar;
			vm.isAberto = ChatFactory.isAberto;
			vm.sair = ChatFactory.sair;
			vm.cadastrar = ChatFactory.cadastrar;

			function entrar() {
				ChatFactory.entrar(vm.usuario.nome, callbackMensagem);
			}

			function callbackMensagem(msg) {
				$log.debug('Nome mensagem: ' + angular.toJson(msg));
				if (angular.isArray(msg)) {
					vm.mensagens = msg;
				} else {
					vm.mensagens.push(msg);
				}
				$scope.$apply();
			}
		});
})();