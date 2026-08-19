import {
  proposalRoleDefinitions,
  proposalRoleIdAliases,
} from "@/content/proposal-roles"

export const siteConfig = {
  couple: {
    bride: "Lara", //Noenyl Bryle M. Gonzaga
    brideNickname: "Lara", //Ltryl
    groom: "Deng", //Ltryl B. Benitez
    groomNickname: "Deng",
    monogram:"/monogram/newMonogram.png" ,//Ltryl
    backgroundMusic:"/background_music/Pasilyo (by_ @sunkissedlolamusic) Violin Cover by Emil Francisco.mp3"
  },
  googleAPI:{
    messageForm: "https://docs.google.com/forms/d/e/1FAIpQLSe1zcXly8WZiWDiqJhEqUqll8xpaCGzwzmowNtJLjg7xz0Oyw/formResponse",   //done
    message: "https://script.google.com/macros/s/AKfycbzLRaIlrlZHmG9Cv0UpqW0IsiFoJdpt7hZRWw8cAPS7urr7ivCmpzmwDw_JXHD_YCEY/exec",  //done
    guestList: "https://script.google.com/macros/s/AKfycbxU-Ry3UEQb2jeQizmnVuskmkYlkAE8hSzjxXFWd8Dn705s4oFmhPu9-FxzMkQPhQldKQ/exec",  //done
    guestRequest: "https://script.google.com/macros/s/AKfycbwYc3SnxZVW3UlJR5t-b1lwVSRZJ33Oc7DG3-efLpWX70YGZLf6xvexvJ8py3Ad67-H7w/exec",   //done
    entourage: "https://script.google.com/macros/s/AKfycbyBLJB9gPllv6_vw4xUtcKp1Bv_uC7LGZfAqU8cQerDSEzSH9P9UtMhnd3H1RwJuoqn8Q/exec",  //done
    sponsors: "https://script.google.com/macros/s/AKfycbz_562RTc-tqqGG6kP6n_Xg53S4rAV41v_dMpKLH6Xn_nj7XzgpPxALcsa3mrRRcyHS-A/exec",  //done 
    proposalResponses: "https://script.google.com/macros/s/AKfycbwIUDKMoMIHVwbmr6KbgmBtlGRpMGj1Z9maeHSEwsFaXNi0dAH8WYhqbtiAfg_p5D4lgw/exec", // uses entourage script with action: proposal
    weddingDetails: "https://script.google.com/macros/s/AKfycbxlILpXCbq5UhynfyXWOKtOYnmLNu1DIBhJMXu8PDSvaW1LKst_JGZoT6jNZFGOfp0qig/exec",   //done
////google share 
    googleShare: "https://docs.google.com/spreadsheets/d/1aNRnpQ8Aiaa_iTjZMhV98lFaJCiALaaSdCAywIX8rZA/edit?usp=sharing", 
  },
  wedding: {
    date: "December 13, 2026",
    time: "3:00 PM",
    venue: "To Be Announced",
    tagline: "are getting married!!!!!",
    theme: "Our wedding palette is inspired by timeless elegance and warmth.Motif Colors: Champagne Gold, Soft Beige, Warm Soft Brown",
    motif: "#BBCED5, #B9C3A8, #F3D8C5, #D1C4D4, #ECD8BA, #F4E8D8, #E1DCCF",
  },
  hero: {
    togetherWith: "Together with",
    hosts: {
      first: "Emanuel Dengabriel",
      second: "Imanuel Yoshua",
    },
    inviteLine: "invite you to celebrate the",
    eventTitle: "Renewal of Vows",
    eventSubtitle: "Silver Wedding Anniversary",
  },
  proposal: {
    // Use "Maid of Honor" for unmarried, "Matron of Honor" for married
    honorAttendant: "Matron of Honor" as "Matron of Honor" | "Maid of Honor",
    roles: proposalRoleDefinitions,
    roleIdAliases: proposalRoleIdAliases,
  },
  details: {
    rsvp: {
      deadline: "September 12, 2026",
      coordinator: "To Be Announced",
      phone: "To Be Announced",
    },
  },
  celebration: {
    /** Set to true once date, time, and venue are ready to publish */
    detailsAnnounced: false,
  },
  contact: {
    bridePhone: "To Be Announced",
    groomPhone: "To Be Announced",
    email: "To Be Announced",
  },
  giftRegistry: {
    QR_1:{
    id: "Gcash",
    src: "/QR/Gcash.png",
    label: "Gcash",
    accountNumber: "M** M : 0945****039",
    },
    // QR_2:{
    // id: "GOtyme Bank",
    // src: "/QR/GOtyme.png",
    // label: "GOtyme Bank",
    // accountNumber: "John Wendel Talagtag",
    // }
  },
  ceremony: {
    location: "To Be Announced",
    venue: "To Be Announced",
    map: "https://maps.app.goo.gl/6Uo3aPZHLPf4DmNAA",
    date: "December 13, 2026",
    day: "Thursday",
    time: "3:00 PM",
    entourageTime: "12:00 PM",
    guestsTime: "12:30 PM",
    image: ["/Details/ceremony.webp", "/Details/ceremony2.webp", "/Details/ceremony3.webp"],
  },
  reception: {
    location: "To Be Announced",
    venue: "To Be Announced",
    map: "https://maps.app.goo.gl/6Uo3aPZHLPf4DmNAA",
    date: "December 13, 2026",
    day: "Thursday",
    time: "5:00 PM",
    image: ["/Details/reception1.webp", "/Details/reception2.webp","/Details/reception3.webp"],
  },
  dressCode: {
      theme: "STRICTLY FORMAL",
    colors: "#C3878C, #ECB4BC, #EBA7B3, #E8B3A7",
    sponsors: {
      photo: "/Details/sponsors-new.png",
      male: "Barong and Black Pants",
      female: "Dusty Blue Long Gown",
    },
    entourage: {
      photo: "/Details/sponsors.png",
      male: "Barong and Black Pants",
      female: "Dusty Blue Long Gown",
    },
    guests: {
      photo: "/Details/new-guest.png",
      male: "Black Suit without Tie",
      female: "Champagne Gold, Chocolate Brown, Beige and Sage Green Long Dress",
    },
    note: "We kindly request our guests to dress in attire following our wedding palette."
  },
  narratives: {
    ourStory: `Once upon a signature…

Our story began with a simple signature, one that slowly turned into something magical. He was my financial advisor, and I was there to sign documents. It was July 5, 2021, and we met at the Lobby of the building. Little did we know, that ordinary day would start a story neither of us expected.

I wasn't looking for anything, yet somehow, our connection grew in its own gentle, unexpected way. And then, on June 1, 2022, our story truly began—we became us. We found a love that feels like home.

Our journey wasn't rushed, but perfectly timed. We believe that God brought us together in His own way and season.

With hearts full of gratitude, we step into this new chapter hand in hand, trusting His plan and celebrating a love rooted in faith, patience, and grace.

Today, we choose each other- again and again- and we can't wait to celebrate this new chapter with the people we love most.`,
    groom: `The first time Mark saw Catherine, time seemed to slow down. It was an ordinary day that instantly became unforgettable: one smile, one hello, and suddenly his world had a new center. He didn't have the perfect words ready, but he knew he had met someone who felt like home.

Early conversations turned into late-night talks, sharing dreams, favorite meals, and whispered prayers for a future together. With every small adventure—coffee runs, long drives, quiet walks—Mark found himself choosing her over and over again. He loved how she laughed freely, how she listened with her whole heart, and how her faith steadied him.

There were seasons of distance and long workdays, but every reunion reminded him why he stayed patient: because Catherine was worth every mile and every minute apart. When he finally knelt to ask for her hand, it wasn't a question of "if," only "when can we start forever?"`,
    bride: `Catherine remembers the first time Mark said her name. It was gentle but sure, a kindness that made her feel both seen and safe. In that softness, she found a partner who met her with the same grace she prayed to give.

Mark's steadiness won her heart: the way he showed up, even when schedules were tight, and how he always found lightness in the small things. He celebrated her wins, held space for her worries, and never hesitated to choose "us" in every decision.

Now, as they prepare to say yes before God and the people they love most, Catherine is grateful for the patience, humor, and hope Mark brings to every day. She knows this next chapter is just the start of the love story they get to write together.`,
  },
  colors: {
    primary: "#87AE73",
    secondary: "#F5F5DC",
  },
  playlist: {
    title: "A Playlist from our hearts",
    subtitle:
      "Come celebrate our 25-year journey through the music we love!\n\nClick the link to listen on Spotify, remember to shuffle, and tell us what tracks bring back your own favorite memories.",
    playlistName: "Lara & Lara Wedding",
    embedUrl:
    //https://open.spotify.com/embed/playlist/6gglYejqocDQHIOhXF2PVl?utm_source=generator&si=9ee769dacd58423b
      "https://open.spotify.com/embed/playlist/6gglYejqocDQHIOhXF2PVl?utm_source=generator&theme=0&si=9ee769dacd58423b",
    spotifyUrl: "https://open.spotify.com/playlist/6gglYejqocDQHIOhXF2PVl",
  },
  snapShare: {
    googleDriveLink:
      "https://drive.google.com/drive/folders/1mILJhQdmYJ0_9hsipZoGYft9nu22M0oH?usp=sharing",
    albumQR: "/QR/AlbumQR.png",
    hashtag: ["#DLarasSilverCelebration",],
    instructions: "Please scan this QR Code and upload the photos and videos you have taken during our wedding reception. We are delighted to see your snaps too!",
  },
  accommodation: {
    coordinator: {
      name: "",
      phone: "0909 912 3844",
    },
    hotels: [
      {
        name: "La Luna Resort",
        discount: "Offered 20% discount for early booking",
        facebook: "https://www.facebook.com/lalunabeachresortofficial",
      },
      {
        name: "GOSAM Beach Resort",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100083461714073",
      },
      {
        name: "Calicoan Villa",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/CalicoanVilla",
      },
      {
        name: "G Camp Beachfront",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100085772194096",
      },
      {
        name: "Punta Viajero Beach Resort",
        discount: "Offered 15% discount",
        phone: "0932 214 6408",
        facebook: "https://www.facebook.com/puntoviajeroresort",
      },
      { name: "Balay Sunset" },
      { name: "Balay Pacifico" },
      { name: "Casa Nala" },
      { name: "The Grey Inn" },
    ],
    carRentals: [
      {
        name: "Apex Car Rental Tacloban",
        facebook: "https://www.facebook.com/profile.php?id=61574882327115",
      },
      {
        name: "Cassey Wheels Car Rental",
        facebook: "https://www.facebook.com/search/top?q=casseywheels%20car%20rental",
      },
    ],
  },
}

export const entourage = [
  // Best Man & Maid/Matron of Honor
  { role: "Best Man", name: "Red Casallo" },
  { role: "Matron of Honor", name: "Imeeliza Timpug" },

  // Parents of the Bride
  { role: "Father", name: "Jaime Balajadia (Uncle)", group: "kate-family" },
  { role: "Mother", name: "Eloida Ricohermoso", group: "kate-family" },

  // Parents of the Groom
  { role: "Brother", name: "Perry Ticbaen (Brother)", group: "christian-family" },
  { role: "Mother", name: "Felicitas Ticbaen", group: "christian-family" },

  // Bridesmaids
  { role: "Bridesmaid", name: "Thea Lynn Dela Cruz" },
  { role: "Bridesmaid", name: "Keara Zane A Cariño" },
  { role: "Bridesmaid", name: "Fidnah Gracia Padallan" },
  { role: "Bridesmaid", name: "Lorna Ladisla" },
  { role: "Bridesmaid", name: "Carla Vanessa Tabilin" },
  { role: "Bridesmaid", name: "Romela Tolentino" },
  { role: "Bridesmaid", name: "Emmalyn Lipio" },
  { role: "Bridesmaid", name: "Carmen Pascual" },
  { role: "Bridesmaid", name: "Ciddie Manota" },

  // Groomsmen
  { role: "Groomsman", name: "Noah Alcaria" },
  { role: "Groomsman", name: "Jervin Garcia" },
  { role: "Groomsman", name: "Myric Mateo" },
  { role: "Groomsman", name: "Caughvan Faustino" },
  { role: "Groomsman", name: "Jayson Torquiano" },
  { role: "Groomsman", name: "Jendah Egino" },
  { role: "Groomsman", name: "Vincent Saguinsin" },
  { role: "Groomsman", name: "Frederick Manota" },
  { role: "Groomsman", name: "Emerson Sulit" },

  // Secondary Sponsors
  // Candle Sponsors
  { role: "Bridesmaid", name: "Romela Tolentino", group: "candle" },
  // Cord Sponsors
  { role: "Bridesmaid", name: "Emmalyn Lipio", group: "cord" },

  // Flower Girls and Little Bride
  { role: "Flower Girl", name: "Kirsten Elija Leyson" },
  { role: "Flower Girl", name: "Blake Juan" },
  { role: "Flower Girl", name: "Reign Arastel Rivera" },
  { role: "Little Bride", name: "Paige Yael Ticbaen" },

  // Ring / Coin Bearers
  { role: "Ring Bearer", name: "Khaleb Dwayne M. Beltran" },
  { role: "Coin Bearer", name: "Lucas Rhaiden Beltran" },
  { role: "Ring Bearer", name: "Dean James Ticbaen" },
]

export const principalSponsors = [
  // Paired from provided Male and Female Sponsors (order-based)
  { name: "Mr. Jony Balao", spouse: "Mrs. Conception Balao" },
  { name: "Mr. Cresencio Francisco", spouse: "Dr. Editha Francisco" },
  { name: "Mr. Aurelio Sab-it", spouse: "Mrs. Ester Sab-it" },
  { name: "Mr. Pio McLiing", spouse: "Mrs. Edna Boloma" },
  { name: "Mr. Fabian Dupiano", spouse: "Mrs. Mary Christine Dupiano" },
  { name: "Mr. Roberto Dosdos", spouse: "Mrs. Angelica Dosdos" },
  { name: "Mr. George Sacla", spouse: "Mrs. Minda De Bolt Sacla" },
  { name: "Mr. Elmo Casallo", spouse: "Mrs. Nora Casallo" },
  { name: "Engr. Jimmy Atayoc Sr", spouse: "Mrs. Mercedes Atayoc" },
  { name: "Mr. Tomas Moyongan", spouse: "Mrs. Betty Moyongan" },
  { name: "Mr. Roger Balantin", spouse: "Mrs. Delia Balantin" },
  { name: "Honorable Mayor Roderick Awingan", spouse: "Mrs. ____ Awingan" },
  { name: "Engr Roy Kepes", spouse: "Vice Gove MaryRose Kepes Fongwan" },
  { name: "Mr. Bobos Nestor Fongwan", spouse: "Mrs. Marga Sison" },
  { name: "Mr. Junvic Suguinsin", spouse: "Mrs. Lavenia Inson" },
  { name: "Mr. Salino Dosdos Jr", spouse: "Mrs. Gina Guiang" },
  { name: "Mr. Pampilo Balajadia", spouse: "Mrs. Angelica Balajadia" },
  { name: "Mr. Alan M. Serduar", spouse: "Mrs. Oliva Serduar" },
  { name: "Mr. Miguel Franco", spouse: "Mrs. Angela Balajadia" },
  // Remaining Female Sponsors without paired male
  { name: "Mrs. Carina C. Watanabe", spouse: "" },
  { name: "Mrs. Cecile Palilio", spouse: "" },
  { name: "Mrs. Nida Saguinsin", spouse: "" },
  { name: "Mrs. Araceli Pitogo", spouse: "" },
  { name: "Mrs. Alda Unidad", spouse: "" },
  { name: "Mrs. Reine Bernadeth Bolanos", spouse: "" },
]
