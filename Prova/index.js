const { createApp } = Vue;

createApp({
    data() {
        return {
            personagemPrincipal: { vida: 100, pocao: 3, critico: 3, escudo: false, defesa: 3 },
            vilao: { vida: 100, vidaAnteriorVilao: 100, critico: 0 },
            jogo: { ativo: false },
            log: [],
            mostrarBotao: false

        }
    },
    methods: {
        defender(isPersonagemPrincipal) {
            if (!this.jogo.ativo) {
                if (isPersonagemPrincipal) {

                    if (this.personagemPrincipal.defesa > 0) {
                        this.personagemPrincipal.defesa -= 1
                        this.personagemPrincipal.escudo = true
                        this.log.push("O heroi levantou sua defesa!")
                        this.acaoVilao()
                    } else if (this.personagemPrincipal.defesa <= 0) {
                        this.log.push("O heroi está indefeso")
                        this.acaoVilao()
                    }
                } else {
                    this.vilao.vida = this.vilao.vidaAnteriorVilao
                    this.log.push("Vilão defendeu!")
                }
                this.vitoriaPersonagemPrincipal()
            }
            this.limparLog()
        },
        usarPocao(isPersonagemPrincipal) {
            if (!this.jogo.ativo) {
                if (isPersonagemPrincipal) {

                    if (this.personagemPrincipal.pocao > 0 & this.personagemPrincipal.vida < 95) {
                        this.personagemPrincipal.pocao -= 1
                        this.personagemPrincipal.vida += 20

                        this.log.push("O heroi utilizou uma poção, recuperando 20 pontos de vida.")
                        this.acaoVilao();

                    } else if (this.personagemPrincipal.pocao > 3) {
                        this.log.push("Impossível se curar, o personagem principal utilizou todas as poções!")
                        this.acaoVilao()

                    } else if (this.personagemPrincipal.vida > 95) {
                        this.log.push("Impossível personagem principal curar com a vida acima de 95%!")
                        this.acaoVilao()

                    }
                } else {

                    if (this.vilao.vida < 95) {
                        this.vilao.vida += 20
                        this.log.push("O Vilão utilizou uma poção, recuperando 20 pontos de vida!")

                    } else {
                        this.log.push("Impossível vilão curar com a vida acima de 85%!")

                    }
                }
                this.vitoriaPersonagemPrincipal()
            }
            this.limparLog()
        },
        atacar(isPersonagemPrincipal) {
            if (!this.jogo.ativo) {
                if (isPersonagemPrincipal) {
                    this.acaoVilao();
                    this.vilao.vidaAnteriorVilao = this.vilao.vida
                    this.log.push("Heroi atacou!")
                    this.vilao.vida -= 20
                } else {
                    if (this.personagemPrincipal.escudo == false) {
                        this.log.push("Vilão atacou!")
                        this.personagemPrincipal.vida -= 20
                    } else if (this.personagemPrincipal.escudo == true) {
                        this.log.push("Vilão atacou")
                        this.log.push("Heroi defendeu o ataque! ")
                        this.personagemPrincipal.escudo = false
                    }
                }
                this.vitoriaPersonagemPrincipal()
            }
            this.limparLog()
        },
        critico(isPersonagemPrincipal) {
            if (!this.jogo.ativo) {
                if (isPersonagemPrincipal) {

                    if (this.personagemPrincipal.critico > 0) {
                        this.personagemPrincipal.critico -= 1
                        this.vilao.vidaAnteriorVilao = this.vilao.vida
                        this.log.push("Heroi conseguiu um golpe crítico")
                        this.vilao.vida -= 35
                        this.acaoVilao();
                        if (this.vilao.vida <= 0) {
                            this.vilao.vida = 0

                        }
                    } else {

                        this.log.push("Heroi não possui mais chance de crítico!.")
                        this.acaoVilao();

                    }
                } else {
                    if (this.personagemPrincipal.escudo == false) {
                        this.log.push("Vilão acertou um golpe crítico")
                        this.personagemPrincipal.vida -= 30

                    } else if (this.personagemPrincipal.escudo == true) {
                        this.log.push("Vilão acertou um golpe crítico")
                        this.log.push("Heroi defendeu o um golpe crítico")
                        this.personagemPrincipal.escudo = false
                    }
                }
                this.vitoriaPersonagemPrincipal()
            }
            this.limparLog()
        },


        acaoVilao() {
            setTimeout(() => {
                const acoes = ['atacar', 'defender', 'usarPocao', 'critico'];
                const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
                this[acaoAleatoria](false);
                this.vitoriaVilao()
            }, 1400)
        },
        vitoriaPersonagemPrincipal() {

            if (this.vilao.vida <= 0) {
                this.vilao.vida = 0
                this.jogo.ativo = true
                this.mostrarBotao = true
                setTimeout(() => { alert('Vitória do personagem principal') }, 500)
            }
        },
        vitoriaVilao() {
            if (this.personagemPrincipal.vida <= 0) {

                this.personagemPrincipal.vida = 0
                this.jogo.ativo = true
                this.mostrarBotao = true

                setTimeout(() => { alert('Vitória do vilão!') }, 500)
            }
        },
        limparLog() {
            if (this.log.length > 6) {
                this.log.shift();
            }
        },

        resetGame() {
            this.personagemPrincipal = { vida: 100, pocao: 3, critico: 3, escudo: false, defesa: 3 };
            this.vilao = { vida: 100, vidaAnteriorVilao: 100, critico: 0 };
            this.jogo.ativo = false;
            this.log = [];
            this.mostrarBotao = false
        }
    }
}).mount("#app");
