import { PropriedadeClasse } from '../declaracoes';
import { VisitanteComumInterface } from '../interfaces'
import { Chamavel } from './chamavel';
import { DeleguaFuncao } from './delegua-funcao';
import { ObjetoDeleguaClasse } from './objeto-delegua-classe';

export class DeleguaClasse extends Chamavel {
    nome: string;
    superClasse: DeleguaClasse;
    metodos: { [nome: string]: DeleguaFuncao };
    propriedades: PropriedadeClasse[]

    constructor(nome?: string, superClasse?: any, metodos?: any, propriedades?: PropriedadeClasse[]) {
        super();
        this.nome = nome;
        this.superClasse = superClasse;
        this.metodos = metodos || {};
        this.propriedades = propriedades || [];
    }

    encontrarMetodo(nome: string): DeleguaFuncao {
        if (this.metodos.hasOwnProperty(nome)) {
            return this.metodos[nome];
        }

        if (this.superClasse !== null) {
            return this.superClasse.encontrarMetodo(nome);
        }

        return undefined;
    }

    paraTexto(): string {
        return `<classe ${this.nome}>`;
    }

    aridade(): number {
        const inicializador = this.encontrarMetodo('construtor');
        return inicializador ? inicializador.aridade() : 0;
    }

    chamar(visitante: VisitanteComumInterface, argumentos: any[]): ObjetoDeleguaClasse {
        const instancia = new ObjetoDeleguaClasse(this);

        const inicializador = this.encontrarMetodo('construtor');
        if (inicializador) {
            inicializador.definirInstancia(instancia).chamar(visitante, argumentos);
        }

        return instancia;
    }
}
