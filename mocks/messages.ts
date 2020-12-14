import { Chance } from 'chance'
import { sub } from 'date-fns'

const chance = new Chance()
const now = Date.now()

const messagesMocks: any[] = [
  [
    {
      text: 'Hello!',
      createdAt: sub(now, { minutes: 2 }),
      userIsSender: false,
    },
    {
      text: 'Hi! How are you?',
      createdAt: sub(now, { seconds: 5 }),
      userIsSender: true,
    },
  ],
  [
    {
      text: 'Hi there!',
      createdAt: sub(now, { months: 1 }),
      userIsSender: true,
    },
    {
      text: chance.sentence({ words: 3 }),
      createdAt: sub(now, { days: 2 }),
      userIsSender: false,
    },
    {
      text: chance.sentence({ words: 10 }),
      createdAt: sub(now, { minutes: 2 }),
      userIsSender: false,
    },
    {
      text: chance.sentence({ words: 5 }),
      createdAt: sub(now, { minutes: 1 }),
      userIsSender: true,
    },
    {
      text: chance.sentence({ words: 2 }),
      createdAt: sub(now, { seconds: 30 }),
      userIsSender: false,
    },
  ],
  [
    {
      text: chance.paragraph({ sentences: 1 }),
      createdAt: sub(now, { months: 3 }),
      userIsSender: false,
    },
    {
      text: chance.paragraph(),
      createdAt: sub(now, { months: 2, minutes: 1 }),
      userIsSender: false,
    },
    {
      text: 'Are you ok?',
      createdAt: sub(now, { months: 2 }),
      userIsSender: true,
    },
  ],
  [
    {
      text: 'Ah, voilà enfin le roi de la classe !',
      createdAt: sub(now, { minutes: 120 }),
      userIsSender: false,
    },
    {
      text: 'L’homme trop bien sapé, Abitbol !',
      createdAt: sub(now, { minutes: 119 }),
      userIsSender: false,
    },
    {
      text: 'Alors comme ça tu as été élu l’homme le plus classe du monde ! Laisse-moi rire !',
      createdAt: sub(now, { minutes: 118 }),
      userIsSender: false,
    },
    {
      text: 'Style le grand play-boy des fonds marins, genre qui fait rêver les ménagères. Sauf que moi je les baise, moi, les ménagères, non ? C’est pas vrai ?',
      createdAt: sub(now, { minutes: 117 }),
      userIsSender: false,
    },
    {
      text: 'Écoute-moi bien, mon petit José. Tu baises les ménagères, bien, tu dois avoir le cul qui brille. Mais c’est pas ça qu’on appelle la classe.',
      createdAt: sub(now, { minutes: 116 }),
      userIsSender: true,
    },
    {
      text: 'Je te dis ça en qualité d’homme le plus classe du monde.',
      createdAt: sub(now, { minutes: 116 }),
      userIsSender: true,
    },
    {
      text: 'Eh, je t’arrête tout de suite. La classe, c’est d’être chic dans sa manière de s’habiller.',
      createdAt: sub(now, { minutes: 30 }),
      userIsSender: false,
    },
    {
      text: 'Rien de tel que d’aller chez Azzedine Alaia…',
      createdAt: sub(now, { minutes: 29 }),
      userIsSender: false,
    },
    {
      text: '… ou même de s’acheter des sous-pulls chez Yohji Yamamoto !',
      createdAt: sub(now, { minutes: 28 }),
      userIsSender: false,
    },
    {
      text: 'Excuse-moi de te dire ça, mon pauvre José, mais tu confonds un peu tout.',
      createdAt: sub(now, { minutes: 27 }),
      userIsSender: true,
    },
    {
      text: 'Tu fais un amalgame entre la coquetterie et la classe. Tu es fou. Tu dépenses tout ton argent dans les habits et…',
      createdAt: sub(now, { minutes: 26 }),
      userIsSender: true,
    },
    {
      text: '… accessoires de mode…',
      createdAt: sub(now, { minutes: 25 }),
      userIsSender: true,
    },
    {
      text: '… mais tu es ridicule. Enfin si ça te plaît…',
      createdAt: sub(now, { minutes: 24 }),
      userIsSender: true,
    },
    {
      text: 'C’est toi qui les portes. Mais moi, si tu veux mon opinion, ça fait un peu… has been.',
      createdAt: sub(now, { minutes: 23 }),
      userIsSender: true,
    },
    {
      text: 'La vache !',
      createdAt: sub(now, { minutes: 22 }),
      userIsSender: false,
    },
    {
      text: 'Moi, j’ai l’air has been ?',
      createdAt: sub(now, { minutes: 21 }),
      userIsSender: false,
    },
    {
      text: 'J’en ai pour plus d’une barre de fringues sur moi. Alors, va te faire mettre !',
      createdAt: sub(now, { minutes: 20 }),
      userIsSender: false,
    },
    {
      text: 'Tu n’es vraiment pas très sympa. Mais…',
      createdAt: sub(now, { minutes: 19 }),
      userIsSender: true,
    },
    {
      text: '…le train de tes injures roule sur le rail de mon indifférence. Je préfère partir plutôt que d’entendre ça plutôt que d’être sourd.',
      createdAt: sub(now, { minutes: 18 }),
      userIsSender: true,
    },
    {
      text: 'Bien ! Considère qu’on n’est plus amis, Abitbol !',
      createdAt: sub(now, { minutes: 17 }),
      userIsSender: false,
    },
  ],
  [
    {
      text: '"There are only two hard things in Computer Science: cache invalidation and naming things." Phil Karlton',
      createdAt: sub(now, { years: 1, months: 1 }),
      userIsSender: false,
    },
  ],
  [
    {
      text: 'Hello!',
      createdAt: sub(now, { years: 5, months: 1 }),
      userIsSender: true,
    },
  ],
]

export default messagesMocks
