# Intranet Postits

Dieses Projekt entstand im Rahmen der Vorlesung Webentwicklung & Java Script Frameworks im SS18 bei Prof. Dr. Wolfgang Taube
an der Hochschule Furtwangen und wurde von Nico Weingärtner entwickelt.
> Da sich die Frameworks und auch der Code dieser App ständig ändern kann es sein das hier gezeigte Codebeispiele nicht auf dem neuesten Stand sind.

## Benutzer Dokumentation

In dieser Webapp können Notizen in Form von Post-its oder zu Deutsch Klebezettel zu den im Intranet der HFU gebuchten Kurse erstellt und verwaltet werden.
#### Registrieren
Um diese Webapp verwenden zu können müssen Sie sich mit Ihrem HFU Account zunächst einloggen, um daraufhin Ihre Kurse abzurufen. Das Passwort wird lediglich md5 kodiert in der Session bei Ihnen lokal gespeichert. 
#### Kursübersicht
Nach erfolgreicher Anmeldung sehen Sie ihre gebuchten Kurse in Form von Post-its, in der unteren rechten Ecke befindet sich ein blauer Kreis, welcher die Anzahl der bereits zu diesem Kurs erstellten Post-Its enthält. 
#### Kurs-Seite
Nachdem Sie einen Kurs angeklickt haben, werden Sie auf die Kursseite weitergeleitet. In der Navigation sehen Sie in welchem Kurs Sie sich momentan befinden und haben die Möglichkeit üben den Zurück-Pfeil wieder auf dei Startseite zu gelangen. Auf der Kursseite erscheint ein Actionbutton mit einem + Symbol, über diesen Button können Sie neue Post-its zu dem aktuellen Kurs indem Sie sich befinden erstellen. 
#### Post-it
Sobald ein Post-it erstellt wurde scrollt die App auf dessen Position und das darin befindliche Textfeld wird fokusiert. Nun können Sie eine kurze Notiz verfassen und durch klicken auf den Senden-Pfeil abschicken. Das neu erstellte Post-it sollte nun mit Text sichtbar sein und 2 Buttons enthalten. Mit dem Bearbeiten-Button symbolisiert durch einen Stift können Sie den Text des Post-its ändern und durch den Löschen-Button (Mülleimer) das Post-it komplett löschen. Diese erstellten Post-its sind für jeden sichtbar der Zugriff zu diesem Kurs hat. Post-its zeigen den Author nicht an (auch wenn diese Information gespeichert wurde) um die Hemmung zu senken öffentliche Notizen zu erstellen, Beispiel Jodel App.

## Technische Dokumentation

### Frontend
Das Frontent wurde mit React und Apollo realisiert im Detail wurden folgende npm module verwendet:
``` 
    "@material-ui/core": "^1.4.3",
    "@material-ui/icons": "^2.0.1",
    "apollo-boost": "^0.1.13",
    "graphql": "^0.13.2",
    "graphql-tag": "^2.9.2",
    "history": "^4.7.2",
    "md5": "^2.2.1",
    "react": "^16.4.2",
    "react-apollo": "^2.1.11",
    "react-dom": "^16.4.2",
    "react-router-dom": "^4.3.1",
    "react-scripts": "1.1.4"
```
#### Apollo
Apollo stellt die Verbindung zwischen dem GraphQL-Server und der React App her. Hierdurch werden die React Komponenten durch Apollo erweitert und durch GraphQL Abfragen mit Daten befüllt.
Für die Integration von Apollo verwendete ich apollo-boost. Apollo-boost ist das von Apollo empfohlene Starter-Kit, welches einen großteil an Voreinstellungen bereits übernimmt, jedoch genug erweiterbar ist um für diese Webapp auszureichen. Für weitere Information zu apollo-boost: https://www.apollographql.com/docs/react/essentials/get-started.html .
Die benötigten User-Informationen für die Abfragen auf dem Backend werden bei jeder Apollo Query/Mutation über den Context mitgeliefert
```    
    const client = new ApolloClient({
    uri: "/api",
    request: async (operation) => {
        operation.setContext({
        headers: {
            username: sessionStorage.getItem('username'),
            password: sessionStorage.getItem('password')
        }
        });
    }
    });
```
#### Navigation
Die Navigation erfolgt über den React-Router dem außerdem eine history übergeben wird um den Zurück-Button zu realisieren
```     
    const App = () => (
        <ApolloProvider client={client}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/course/:id" component={SingleCoursePage}/>
                </Switch>
            </Router>
        </ApolloProvider>
    );
```
Die 3 Hauptseiten, welche über den Router navigiert werden bestehen aus der Login-Seite, der Kursübersicht (hier Home) und der Kursseite eines einzelnen Kurses (hier SingleCoursePage ). Bei dem Wechsel von der Kursübersicht auf einen einzelnen Kurs wird die Id des Kurses als Parameter über die URL mitgegeben um damit die Daten des einzelnen Kurses abzurufen. Dies wäre in der aktuellen Version der App jedoch nicht mehr nötig, da ich nun den Apollo Cache als State für die App verwende und diese Information daraus schöpfen kann (mehr zu der Datenhaltung später).

#### Login
Die Loginkomponente ist dafür zuständig die in den 2 Texfeldern eingetragen Daten Benutzername und Passwort über eine Mutation, welche durch die Apollo Mutation Komponente (siehe https://www.apollographql.com/docs/react/essentials/mutations.html) ausgelöst wird, an unser Backend zu senden, um den Benutzer über das Intranet zu authentifizieren.
#### Kursübersicht
Ist der Benutzer erfolgreich eingeloggt wird die Courses-Komponente angezeigt welche über eine Apollo Query alle im Intranet eingetragenen Kurse abruft und dazu eine SingleCourse-Komponente rendert. Diese Komponente ist zeigt den Namen des Kurses,die Anzahl der zu diesem Kurs erstellten Post-its an und verlinkt auf die Kursseite.
``` 
     <Card className="my-card">
            <Link to={`course/${this.props.id}`}>
                <CardContent>
                <Typography variant="headline" component="h2">
                    {this.props.name}
                </Typography>
                </CardContent>
                </Link>
                <Query
                    query={GET_POSTS_IN_COURSE}
                    variables={{ id: this.props.id.toString() }}
                >
                {({ loading, error, data, refetch }) => {
                    if (loading) return <div className="my-delete-btn">...</div>
                    if (error) return <div className="my-delete-btn">err</div>
                    console.log(data)
                    return <div className="my-delete-btn"><Chip color="primary" variant="outlined" label={data.getPostItsInCourse.length}/></div>
                }}
                </Query>
        </Card>
```
#### Kursseite
Die "Kursseite" besteht aust 3 Komponenten:
- **SingleCoursePage** stellt den Grundaufbau der Kursseite da und beinhaltet Die Navigation, den Fab-Button und die PostItList
- **PostItList** ist zuständig für das rendern der einzelnen Post-its und auch für die Post-it-Erstellung über eine Mutation
- **PostIt** diese Komponente stellt ein einzelnes Post-it mit dessen Textinhalt und den 2 Actionbuttons dar. Hier werden auch die 2 Funktionen Bearbeiten und Löschen über Mutations ausgeführt.

#### Design
Einiges an CSS wurde von mir geschrieben um den gewünschten Post-it Look zu kreieren zudem wurden jedoch Komponenten aus Material-UI-React(https://material-ui.com/) verwendet.
Dazu gehören zum Beispiel die Appbar, der Fab-Button und die Card-Komponente. Diese Komponenten wurden großteils stark bearbeitet. Für das Layout benutze ich CSS-Grid und Flexbox. CSS-Grid ist relativ neu in CSS und wird noch nicht von allen Browsern unterstützt (https://caniuse.com/#feat=css-grid), stellt für mich jedoch die Zukunft dar und macht das Layout Design um einiges angenehmer.

### Backend
Das Backend besteht aus einem Node Express Server, welcher das Frontend und die GraphQL-Schnittstelle zur Verfügung stellt und auf die MongoDB Datenbank zugreift.

#### GraphQL
>  GraphQL ist eine Open-Source-Datenabfrage- und Manipulationssprache und eine Laufzeit zum Ausfüllen von Abfragen mit vorhandenen Daten. GraphQL wurde 2012 von Facebook intern entwickelt und 2015 veröffentlicht.
> - Wikipedia

Für die GraphQL Integration verwende ich das Modul apollo-server-express und für die Schema-Erstellung gql-tools. Zuerst benutze ich apollo-server, welches mehr für einen übernimmmt. Da ich jedoch ein paar Optionen für meinen Express Server festlegen musste, um zum Beispiel Frontend und Backend über ein Heroku-Slot laufen zu lassen oder den Context zu integrieren, entschied ich mich für apollo-server-express um mehr Freiheiten zu besitzen.
Nach einigen Routing Problemen, sieht mein funktionierendes Routing folgendermaßen aus:
```
const graphQLServer = express();
graphQLServer.use(express.static(path.join(__dirname, 'frontend/build')));
graphQLServer.use('/api', bodyParser.json(), graphqlExpress(request => ({
  schema,
  context: request
})));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/api' }));
graphQLServer.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
});
graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
```
#### Schema
Die shema Datei erhält das komplette GraphQL Schema. Dadurch wird festgelegt welche Daten abgefragt werden können und was man erwarten kann zu erhalten. Diese hier festgelegten Queries und Mutations werden im Frontend über Apollo benutzt.
So sieht das komplette Schema der Anwendung aus:
```
const typeDefs = `
type Query {
    allCourses : [Course]
    
    singleCourse (
    id: String!
    ): detailCourse

    getPostItsInCourse(
    courseId: String!
    ):[PostIt]
  
}
type Mutation{
    registerUser: User

    addPostIt(
    content: String!
    author: String!  
    courseId: String!
    id: String
    ): PostIt

    deletePostIt(
    id:String!
    ): PostIt
}
type detailCourse {
    id: Int
    name: String
    short: String
    vinfo: String
    block: String
}
type Course {
    id: Int
    name: String
    short: String
}
type User {
    userName: String
    courses: [String]
} 
type PostIt {
    content: String
    author: String
    courseId : String
    id : String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
```
#### Resolver 
Der Resolver ist dafür zuständig den Queries und Mutations Funktionen zuzuweisen,welche die angeforderten Daten bereitstellen. 
Diese Funktionen hab ich in einer Datei Namens Connector ausgelagert.
Beispiel Resolver:
```
const resolvers = {
    Query: {
        allCourses(obj, args, context, info) {
            return Course.getAll(obj,args,context,info);
        },
        singleCourse(obj, args, context, info) {
            return Course.getSingle(obj,args,context,info);
        },
        getPostItsInCourse(obj, args, context, info){
            return PostIt.getByCourseId(obj,args,context,info);
        }
    },
    Mutation: {
        registerUser(obj, args, context, info){
            return User.register(args,context);
        },
        addPostIt(obj, args, context, info){
            return PostIt.add(args,context);
        },
        deletePostIt(obj, args, context, info){
            return PostIt.delete(args,context);
        }
    }

};
```
####Connector
Hier findet die eigentliche Arbeit statt. In der Connector Datei führe ich die ganzen Zugriffe aus Intranet und der MongoDB aus.
Die Userdaten werden vom Frontend aus als Context bei jeder Query mitgeschickt und hier für die Zugriffe aus Intranet verwendet. Die Funktionen müssen ein Objekt passend zur Query returnen. Beispiel Kursabfrage:
```
    getAll(obj,args,context,info) {
        return axios.get('https://webservdm.hs-furtwangen.de/subsites/Frapi/public/veranstaltungen/liste',
            {
                auth: {
                username: context.headers.username,
                password: context.headers.password
                    }
            })
            .then(res => {
                return res.data.veranstaltungen;
            });
    }
```
####MongoDB
Als Datenbank entschied ich mich für MongoDB. Da die Anwendung auf Heroku läuft entschied ich mich dafür das Heroku Add-on mlab zu verwenden. Die Zugriffe auf die Datenbank laufen über das npm module "mongoose".
Auch bei MongoDB muss ähnlich wie bei GraphQL ein Schema erstellt werden:
```
let postItSchema = mongoose.Schema({
    content: String,
    author: String,
    courseId: String,
    id: String
});
```
Dies fühlt sich etwas nach doppelt gemoppelt an, da bereits ein solches Schema für GraphQL erstellt wurde, aber vielleicht gibt es dafür mittlerweile eine Lösung um alles in einem Schema zu definieren?
Da ich Probleme mit den mongoose callbacks hatte, griff if auf js async/await zurück um asynchrone Zugriffe auf die Datenbank zu machen.
```
async getByCourseId(obj,args,context,info){
    let myReturn = await PostIts.find({ 'courseId': args.courseId }, 'content author courseId id');
    myReturn.map((el)=>{
        return prepare(el);
    })
    return myReturn;
    }
```
Die hier benutze prepare Funktion dient lediglich dazu die automatisch erstellte mongo-ID in einen String zu verwandeln um diesen über GraphQl auszuliefern.
```
const prepare = (o) => {
    o.id = o._id.toString()
    return o
  }
```
Grundlegend werden 3 Modelle auf in Datenbank gespeichert:
- Kurs: Id des Intranetkurs, welche User gehören zu diesem Kurs und welche Post-its wurden zu diesem Kurs erstellt.
- User: Der Name des Users, die gebuchten Kurse und die erstellten Post-its.
- Post-its: Der Name des authors, der Textinhalt und eine Id

### Datenmanagement
Es gibt viele möglichkeiten den lokalen State einer Anwendung zu kontrollieren wie zB. Redux, React Context API ,Mobx oder apollo-link-state(hier ein Blog-Artikel dazu https://blog.bitsrc.io/state-of-react-state-management-in-2019-779647206bbc). Da apollo-link-state bereits in apollo-boost integriert ist und ich sowieso Apollo verwende, entschied ich mich meinen lokalen State über den Apollo Cache zu werwalten. Nach einigen Problemen liesen sich die wichtigsten Informationen wie zB die Post-it Objekte im Cache speichern. Das manuelle verändern des Caches war vorallem bei Mutations wichtig. Aktualisiert man in einer Mutation ein Objekt welches über eine Id verfügt übernimmt apollo das updaten des Caches. Erstellt man jedoch in neues Objekt oder löscht eines, wie in meinem Fall ein Post-it, muss man den cache selbst verändern.
Beispiel:
```
<Mutation mutation={ADD_POSTIT} ignoreResults={false} onCompleted={()=>console.log("MUTATION COMPLETED")} onError={()=>console.log("MUTATION ERROR")}
            update={(cache, { data: { addPostIt } }) => {
                const {getPostItsInCourse} = cache.readQuery({ 
                    query: GET_POSTS_IN_COURSE,
                    variables:{id: this.props.match.params.id}
                 });
                cache.writeQuery({
                  query: GET_POSTS_IN_COURSE,
                  variables:{id: this.props.match.params.id},
                  data: { getPostItsInCourse: getPostItsInCourse.concat([addPostIt]) },
                });
              }}
            >
```
Jede Apollo Query und Mutation wird im Cache gespeichert.

#### Problem
Als ich auf den Cache umgestiegen bin, traf ich auf ein unscheinbares Problem, das mich mehrere Stunden beschäftigte.
Ich wollte lediglich die Anzahl der Post-its die ein Kurs enthält anzeigen und fragte dazu die Post-its in einer Query ab. Nachdem ein neues Post-it erstellt wurde aktualisierte sich diese Zahl jedoch nicht. Das neue Post-it wurde im Cache angezeigt und auch die Query schien zu funktionieren. Das Problem war das die selbe Query einmal mit dem Parameter ID als String und woanders mit ID als Integer aufgerufen wurde. Beide Queries funktionierten, aber wurden von Apollo nicht mehr als ein und die selbe Query erkannt sondern als 2 Unterschiedliche und somit 2 mal im Cache gespeichert. Diese kleine Problem führte dazu, dass ich den State merhmals umschrieb, bis ich den Typ-Unterschied des ID-Parameter bemerkte.

### Deployment
Um sowohl Frontend als auch Backend auf einem Heroku Slot deployen zu können benutze ich in der package.json das heroku post-build script:
```
 "scripts": {
    "start": "nodemon ./server.js --exec babel-node",
    "heroku-postbuild": "cd frontend && npm install && npm run build"
  },
```
Hierduch werden nachdem die Anwendung deployed ist auch die Frontend npm module installiert und ein statischer build generiert, welcher vom backend an den User geliefert wird.
