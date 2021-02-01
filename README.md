# EasypayAtm

Easypay-Atm è il frontend della vista dedicata al commerciante per la gestione delle operazioni e le interazioni fisiche con un cliente.
L'idea è la realizzazione di una interfaccia ispirata ad un ATM bancario. ma che permetta di effettuare semplici operazioni di pagamento e di ricarica da parte di un cliente che si presenta fisicamente al negozio.

Il progetto è un sotto modulo del progetto principale [EasyPay (https://github.com/Seniorsimo/EasyPay)](https://github.com/Seniorsimo/EasyPay).

**ATTENZIONE: Il progetto è un lavoro universitario e non ha alcuna finalità commerciale. Il progetto è un semplice prototipo dell'idea**

## @angular-cli

Questo progetto è generato con [Angular CLI](https://github.com/angular/angular-cli) ed è attualmente alla versione 10.1.5.

```
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 10.1.6
Node: 10.16.3
OS: linux x64

Angular: 10.1.5
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router
Ivy Workspace: Yes

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1001.6
@angular-devkit/build-angular   0.1100.6
@angular-devkit/core            10.1.6
@angular-devkit/schematics      10.1.6
@angular/cdk                    10.2.4
@angular/cli                    10.1.6
@angular/flex-layout            10.0.0-beta.32
@angular/material               10.2.4
@schematics/angular             10.1.6
@schematics/update              0.1001.6
rxjs                            6.6.3
typescript                      4.0.3
```

## Server di Sviluppo

Per testare il contenuto in locale è sufficiente lanciare il comando `npm start`.
per poter funzionare in locale al meglio è necessario anche avviare il mock del server tramite `npm run backend`.

*Nota: a causa di un problema di compatibilità con il nome dei file di `saray` e windows, alla fine il mock del back end è stato cambiato in itinere con uno custom creato con node express. Pertanto alcune delle chiamate rest non sono state completamente riprodotte nel nuovo backend*

## Server di Application / Produzione

Il progetto è rilasciato su [Heroku](https://www.heroku.com/). 
*Essendo un progetto universitario con finalità il conseguimento di un esame lo sviluppo sarà interrotto una volta entrato in produzione e presentato.*

L'ambiente di Application verrà sostituito dall'ambiente di Production in data 14/02/2021 ed è raggiungibile su [https:///easypay-unito.herokuapp.com/atm](https:///easypay-unito.herokuapp.com/atm).

### Build

La fase di build è consigliata solo scaricando l'intero progetto principale:
[https://github.com/Seniorsimo/EasyPay](https://github.com/Seniorsimo/EasyPay)

- build ambiente application (sviluppo): `npm run build` 
- build ambiente production: `npm run build:prod`

Il risultato dell'operazione è reindirizzato al di fuori del progetto, nel path `../webapp/atm`. Una volta buildato è possibile fare il commit della cartella modificata e pusharlo sul branch `master`.
Heroku aggiornerà automaticamente il server.

## Info utili su Angular

In sintesi angular è un framework js (con supporto nativo per typescript) che permette una realizzazione strutturata di SPA (Single page application). Maggiori informazioni possono essere trovate sulla guida ufficiale ([Angular.io](https://angular.io/))

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Componenti Fondamentali

- **module**: 
Sono delle librerie che suddividono sia logicamente che strutturalmente le varie funzioni dell'applicazione che verrà creata
- **component**: 
- **directive**: 
- **pipe**: 
- **service**: 

#### module
Sono delle librerie che suddividono sia logicamente che strutturalmente le varie funzioni dell'applicazione che verrà creata.
li si può riconoscere dalla nomenclatura `*.module.ts`
#### component
I componenti sono la principale componente grafica del progetto. La parte più essenziale è il file `*.component.ts` che contiene al suo interno la logica del componente e il relativo html e style.
In realtà per comodità (e di default tramite comando ng)  è preferibile scorporare le 3 parti in 3 file ottenendo quindi 3 file con lo stesso nome.
Se ad esempio si sta creando un componente home, il risultato sarà la creazione di 3 file:
- `home.component.ts`
- `home.component.html`
- `home.component.scss`

#### directive
Le Direttive sono dei metodi avanzati per suddividere le funzioni logiche dei componenti. Per suddividere le funzioni logiche di un componente (o eventualmente riutilizzare del codice già scritto su più componenti) è possibile creare una direttiva che andrà di fatto ad allacciarsi ad un componente ed eseguirà delle operazioni su di esso.
Ad esempio si potrebbe creare una direttiva filter con lo scopo di colorare dei componenti che rispettano una determinata logica.
`filter.directive.ts`  

```html
<div #example filter >Hello Example</div>
```


#### pipe
Le Pipe invece sono delle funzioni che possono essere eseguite per manipolare la resa grafica delle variabili nella parte html.
Esistono diverse pipe già messe a disposizione da angular (come ad esempio la pipe `Date` che permette di formattare le date o la utilissima Pipe `Async` che permette di fare una subscribed di un observable (o di una promise) e visualizzare il suo contenuto nell' html)

```html
<div>{{observable$ | async }}</div>
```

#### service 
I service sono una ulteriore suddivisione tra le funzioni del componente e un livello più astratto della logica.
La peculiarità dei service è di essere dei ***Singleton*** *(N.B. Su angular i service sono inseriti nei moduli tramite una dependency injection. Se un service viene importato su più moduli quest'ultimo è singleton all'interno del modulo.)*

I service sono spesso usati per comunicare con il backend o altri servizi e manipolare i dati prima di utilizzarli effettivamente.

### store
Gli store non sono uno standard  di angular ma sono dei service specializzati per immagazzinare i dati e poterli riutilizzare nell'applicazione.

*nota: angular è in grado di mantenere in store i dati finché è in esecuzione la SPA (quindi è possibile muoversi al suo interno tramite il router interno senza perdere i dati ma se si esce o si ricarica i dati andranno persi. Una buona soluzione può essere salvarli in localstorage)*

### Struttura di EasyPay-ATM

Come ogni progetto angular è suddiviso in moduli.
C'è un modulo per ogni singola sezione del progetto (home, pagamento, ricarica, ecc).
Visto la dimensione ridotta si è preferito non usare il lazy loading (caricamento asincrono dei moduli solo nel momento in cui viene effettivamente usato) ma caricare tutti i moduli all'avvio.

Altri moduli essenziali sono il modulo `coreModule` e il modulo `sharedModule`.
Entrambi sono degli standard consigliati di angular e in particolare *coreModule* serve per raggruppare tutti i service singleton, mentre *sharedModule* raccoglie tutti i componenti e i pipe riutilizzabili.

### Ciclo di vita del Componenti

Dal momento della sua creazione il componente ha un cosiddetto 'lifecycle' nei quali è possibile allacciarsi tramite hook ed effettuare le operazioni desiderate.

```
- constructor
- onChanges
- onInit
- doCheck
    - AfterContentInit    <-
    - AfterContentChecked   |
    - AfterViewInit         |
    - AfterViewChecked    __|
- onDestroy
```

### Rxjs

[Rxjs](https://rxjs-dev.firebaseapp.com/api) è una libreria avanzata per gestire gli Observable usata di default da [Angular.io](https://angular.io/).
Il suo funzionamento è essenziale sia per gestire le chiamate  http asincrone, sia per aggiornare la vista dei componenti.

