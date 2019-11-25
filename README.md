# RakendusteprogSanderHanni

## Heroku leht

* https://rphannis2019.herokuapp.com/

## funktsionaalsed nõuded

* Lehel kuvatakse automaatselt kampaania tooted
* Lehel  tuuakse soodustusega tooted esile
* Kasutatakse küpsiseid, et näidata kasutajatele sobivaid tooteid
* Saab valida tooteid kategooriate alusel :heavy_check_mark:
* Saab sorteerida tooteid hinna ja populaarsuse järgi
* Peab toimima nutiseadmete peal :heavy_check_mark:
* kõrge kvaliteediga thumbnailid
* Pakub kasutajatele erilisi pakkumisi (?küpsiste alusel?)
* Tooteid saab lisada ostukorvi :heavy_check_mark:
* Tooteid saab eemaldada ostukorvist
* Saab valida toote hulka ostukorvis :heavy_check_mark:
* Enne maksmist pakutakse kasutajatele lisaks "related" tooteid
* Saab maksta krediitkaardiga
* Saab maksta pangalingiga
* Kasutajatele saadetakse email ostutingimuste kohta
* Kasutajad saavad valida pakiautomaadi, kuhu tooted transporditakse
* Kasutajad saavad tooteid search bari kasutated otsida
* Peaks olema FAQ section
* Kasutajad saavad toote kohta lisainformatsiooni
* Peab olema turvaline
* Kasutajad saavad küsimuste korral mulle kirjutada emaili
* Kasutajad saavad teatud aja sees tellimuse katkestada
* Kasutajatel on võimalik luua enda Kasutajad :heavy_check_mark:
* Tooteid ostes saavad kasutajad sooduskuponge
* Kasutajad saavad kasutada wishlisti: Neile saadetakse teave, kui toote, mis on nende wishlistis, hinda alandatakse
* On võimalik esitada tellimusi
* Osutkorvis pakutakse kasutajale related tooteid :heavy_check_mark:
* Kasutajale antakse tagasisidet kas sisselogimine ja kasutajaloomine oli edukas või mitte :heavy_check_mark:
* Kasutaja peab valideerima om emaili peale kasutaja tegemist

## Tehniline küsimus

**Kas saab kutsuda välja klassi funktsiooni ja klassi state muuta väljaspool klassi?**

```javascript
class Classname extends React.PureComponent{

  constructor(props) {
    super(props);
    this.function = this.function.bind(this);
    this.state = {
      some_state: value,
    };
  }

  function = ()=> {
    console.log("hello world");
  }

  componentDidMount(){
    this.setState({
        some_state: new_value
    });
  }

    render() {
        return(
            <>     
                <div><FunctionalComponent key={props._id} {...props} /><div/>
            </>

        );
    }
}

const FunctionalComponent = ({props}) =>{
  return (
      <div>
        <button onClick={this.function}>click me!</button>
      </div>
  );
};
```

Meme
======

![meme](./public/img/meme.jpg)
