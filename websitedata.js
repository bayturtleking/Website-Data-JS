const queryString51515w = window.location.search;
var url = window.location.href;
const urlParams515w = new URLSearchParams(queryString51515w);
var searchquery = urlParams515w.get("query");

function getSubpages(subpagestosend, domainurl) {
  if (typeof subpagestosend !== 'string' || !subpagestosend.includes(':')) return '';
  const subpagesString = subpagestosend.split(':')[1].trim();
  if (!subpagesString) return '';
  const subpagesArray = subpagesString.split(',').map(subpage => subpage.trim());
  let subpagesLinks = '';
  subpagesArray.forEach(subpage => {
    subpagesLinks += `<a href="${domainurl + subpage}">${subpage}</a> `;
  });
  return subpagesLinks.trim();
}
function worddistancethang(a, b) {
  const dp = Array(a.length + 1)
    .fill(null)
    .map(() => Array(b.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, 
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

function findObjectsByKeyword(keywordToSearch, data) {
  const lowerCaseKeywordToSearch = keywordToSearch.toLowerCase().trim();

  const hastheheightofadog = keywordToSearch.length <= 5;
  const scoredResults = data.queries.map((object, index) => {
    const title = object.title.toLowerCase().trim();
    let score = 0;
    
    if (hastheheightofadog) {
      if (title.startsWith(lowerCaseKeywordToSearch)) {
        score = 1000;
      } else if (title.includes(`-${lowerCaseKeywordToSearch}`)) {
        score = 800; 
      } else if (title.includes(lowerCaseKeywordToSearch)) {
        score = 500;
      }
    } else {
      if (title === lowerCaseKeywordToSearch) {
        score = 1000;
      } else if (title.includes('.') && title.startsWith(lowerCaseKeywordToSearch)) {
        score = 800;
      } else if (title.includes(lowerCaseKeywordToSearch)) {
        score = 500;
      } else if (object.keywords.toLowerCase().includes(lowerCaseKeywordToSearch)) {
        score = 100;
      } else {
        const distance = worddistancethang(lowerCaseKeywordToSearch, title);
        if (distance <= 3) {
          score = 400 - (distance * 100);
        }
      }
    } 

    for (let keywordtocheck of object.keywords.split(",")) {
      let cleanedKeyword = keywordtocheck.trim().toLowerCase().replace(/[^\w-]/g, "");
      let cleanedSearch = lowerCaseKeywordToSearch.replace(/[^\w-]/g, "");

      if (cleanedKeyword === cleanedSearch) {
        score += 1500;
      } 
      if (cleanedKeyword.startsWith(cleanedSearch) && cleanedKeyword !== cleanedSearch) {
        score += 600;
      }
    }

    return {
      object,
      index,
      score
    };
  });

  const minScore = hastheheightofadog ? 500 : 0;

  const filteredAndSorted = scoredResults
    .filter(result => result.score > minScore)
    .sort((a, b) => b.score - a.score);

  return filteredAndSorted.length > 0 
    ? filteredAndSorted.map(({ object, index }) => ({ object, index }))
    : null;
}


var dataJSON = {
  queries: [
                            {
      title: "Switch to Reimagined",
      description: "Switch to the newer TurtleWave Search: Reimagined for lighting fast answers, better results, and more widgets. You will never want to use classic TurtleWave Search again.",
      url: "https://search.turtlewave.dev",
      keywords: "search engine, turtlewave search, search, turtlewave",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=search.turtlewave.dev/"
    },
                        {
      title: "GameStop",
      description: "Shop GameStop, the world's largest retail gaming and trade-in destination for Xbox, PlayStation, and Nintendo games, systems, consoles & accessories.",
      url: "https://www.gamestop.com/",
      keywords: "gamestop, game store, video game store, xbox, playstation, nintendo, game consoles, consoles",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=gamestop.com"
    },
                    {
      title: "Squish-City",
      description: "An ad-free retro social media with no modern greedy excess",
      url: "https://squish-city.com",
      keywords: "squish town, squish city, social media, games, gaming",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=squish-city.com"
    },
                {
      title: "Bitly",
      description: "Leading in URL Shortening since 2008",
      url: "https://bit.ly",
      keywords: "url shortener, shorten urls, bitly, bit.ly",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=bit.ly"
    },
            {
      title: "GoSwift",
      description: "Developed by TurtleWave Search, this URL shortener is privacy-focused, fast, and secure.",
      url: "https://goswift.turtlewave.dev",
      keywords: "url shortener, shorten urls, bitly, bit.ly, goswifter, go swifter",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1762488760/Untitled_kdo1f6.png"
    },
                                                                        {
      title: "Turtlewave Edit",
      description: "Edit images in seconds",
      url: "https://edit.turtlewave.dev/",
      keywords: "image editing, image editor, canva, edit images",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1760234753/Edit_yaz69q.png"
    },
                                                                    {
      title: "Turtle Net",
      description: "Browse the most handsome turtles on the Internet on this classic-themed website.",
      url: "https://turtlenet.netlify.app",
      keywords: "turtles, social media, turtlenet",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=turtlenet.glitch.me"
    },
                                                                {
      title: "TurtleWave Games",
      description: "Owned by TurtleWave Search and known for Superpower City, TurtleWave Games is a Roblox game development studio committed to making fun and safe experiences for all ages.",
      url: "https://turtwave.netlify.app/rblx/",
      keywords: "turtlewave games, roblox",
      icon: "https://tr.rbxcdn.com/180DAY-c0e8a76728493d720a266f44f78b04fb/150/150/Image/Webp/noFilter"
    },
                                                            {
      title: "Micro Center",
      description: "Micro Center is widely regarded as the 'holy grail' of tech stores, offering unbeatable in-store deals on PC components, gaming gear, electronics, and expert support for builders and enthusiasts.",
      url: "https://www.microcenter.com/",
      keywords: "pc shopping, computers, micro center",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=microcenter.com"
    },
                                                        {
      title: "Best Buy",
      description: "Shop Online, See Product Availability & Have Your Product Shipped. Fast And Free.",
      url: "https://www.bestbuy.com/",
      keywords: "pc shopping, computers, appliances, best buy",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=bestbuy.com"
    },
                                                    {
      title: "SoundCloud",
      description: "Discover and play over 320 million music tracks. Join the world's largest online community of artists, bands, DJs, and audio creators.",
      url: "https://soundcloud.com",
      keywords: "music, soundcloud",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=soundcloud.com"
    },
                                                {
          title: "BookFinder.com",
      description: "Compare prices on new and used textbooks, rentals, old editions, and international edition textbooks.",
      url: "https://www.bookfinder.com/",
      keywords: "library, libraries, book search, books",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=bookfinder.com"
    },
                                            {
          title: "cobalt",
      description: "cobalt lets you save what you love without ads, tracking, paywalls or other nonsense. Just paste the link and you're ready to rock!",
      url: "https://cobalt.tools",
      keywords: "download youtube videos, cobalt, youtube video downloader",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=cobalt.tools"
    },
                                        {
          title: "FakeYou",
      description: "Use AI to recreate popular voices",
      url: "https://fakeyou.com/",
      keywords: "fakeyou, text to speech, tts",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=fakeyou.com"
    },
                                    {
          title: "DeepL Translate",
      description: "Translate texts & full document files instantly. Accurate translations for individuals and Teams. Millions translate with DeepL every day.",
      url: "https://www.deepl.com/",
      keywords: "translator, translate, to english, translate",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=deepl.com"
    },
                                {
          title: "12ft",
      description: "Remove popups, banners, and ads from any website.",
      url: "https://12ft.io/",
      keywords: "adblock, ad remover, popup remover",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=12ft.io"
    },
                            {
          title: "VirusTotal",
      description: "Analyse suspicious files, domains, IPs and URLs to detect malware and other breaches, automatically share them with the security community.",
      url: "https://www.virustotal.com",
      keywords: "malware scanner, virus scanner, antivirus, file scanner",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.virustotal.com"
    },
                        {
          title: "noclip",
      description: "A digital museum of video game levels.",
      url: "https://noclip.website",
      keywords: "video game levels, video game maps, noclip, noclip.website",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=noclip.website"
    },
                    {
          title: "web.dev",
      description: "We want to help you build beautiful, accessible, fast, and secure websites that work cross-browser, and for all of your users.",
      url: "https://web.dev/",
      keywords: "web.dev, website practices",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=web.dev"
    },
                {
          title: "TurtleWave Services",
      description: "An official list of every TurtleWave Product",
      url: "https://turtlewave-updates.glitch.me/services.html",
      keywords: "turtlewave products, turtlewave services",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1747960051/NewLogoSmall_tohsor.png"
    },
            {
          title: "Google Services",
      description: "List of every Google Product",
      url: "https://policies.google.com/terms/service-specific",
      keywords: "google products, google services",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.google.com"
    },
        {
          title: "Universal Studios",
      description: "Official Universal Studios website, with details on new and upcoming movies, theme parks, and production services.",
      url: "https://www.universalstudios.com",
      keywords: "universal, orlando resort,",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.universalstudios.com"
    },
                       {
          title: "Weirdest Animals",
      description: "Stories of the Weird and Wild from National Geographic!",
      url: "https://www.nationalgeographic.com/animals/topic/weird-wild",
      keywords: "weirdest animals, strangest animals, weird animals, strange animals, weird and wild",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.nationalgeographic.com"
    },
                   {
          title: "SpaceX",
      description: "SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology.",
      url: "https://www.spacex.com",
      keywords: "spaceX, space",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.spacex.com",
      subpages: ": /careers"
    },
               {
          title: "NASA",
      description: "NASA.gov brings you the latest news, images and videos from America's space agency, pioneering the future in space exploration, scientific discovery and more.",
      url: "https://www.nasa.gov",
      keywords: "nasa, space",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nasa.gov"
    },
           {
          title: "Memebase",
      description: "Funny memes that GET IT and want you to too. Get the latest funniest memes and keep up what is going on in the meme-o-sphere.",
      url: "https://memebase.cheezburger.com/",
      keywords: "meme, meme database, meme-base",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=memebase.cheezburger.com"
    },
                                                      {
          title: "Star Wars",
      description: "The official site for Star Wars, featuring the latest news on Star Wars movies, series, video games, books, and more.",
      url: "https://www.starwars.com",
      keywords: "star-wars",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.starwars.com"
    },
                                                  {
          title: "New York Times",
      description: "Live news, investigations, opinion, photos and video by the journalists of The New York Times from more than 150 countries around the world.",
      url: "https://www.nytimes.com",
      keywords: "news, nyt, nytimes, crosswords",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.nytimes.com",
      subpages:": /games/"
    },
                                              {
          title: "Playstation",
      description: "Explore the new generation PlayStation 4 and PS5 consoles",
      url: "https://www.playstation.com",
      keywords: "ps5, ps4, playstation, console",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.playstation.com"
    },
                                          {
          title: "Littleton Coin",
      description: "Order collectible coins, currency & supplies online at Littleton Coin. ",
      url: "https://www.littletoncoin.com",
      keywords: "coins",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=littletoncoin.com"
    },
                                      {
          title: "The Official U.S. Mint",
      description: "The Official Source for New U.S. Coins. Shop new products. Reserve unreleased coins",
      url: "https://www.usmint.gov",
      keywords: "coins, us mint",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=usmint.gov"
    },
                                  {
          title: "Stone Mountain Park",
      description: "Atlanta's favorite destination for family fun. ",
      url: "https://stonemountainpark.com/",
      keywords: "stone mountain park",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=stonemountainpark.com"
    },
                              {
          title: "Amercia's Best Franchises",
      description: "Find the Best Franchise Opportunities for sale. Browse our Franchise Directory and learn more about ownership info, startup costs and fees.",
      url: "https://americasbestfranchises.com/",
      keywords: "franchises",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=americasbestfranchises.com"
    },
                          {
          title: "Saladworks",
      description: "Fresh. Healthy. Good. As the original salad destination, we continue to offer more choices than anyone else.",
      url: "https://www.saladworks.com/",
      keywords: "salad, soup, healthy foods",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.saladworks.com"
    },
                      {
          title: "Subway",
      description: "Subway is the better choice when it comes to freshly made, convenient food, serving customizable signature sandwiches, wraps and salads to guests every day.",
      url: "https://www.subway.com/",
      keywords: "sandwiches, salad",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.subway.com"
    },
                  {
          title: "Arby's",
      description: "We Have The Meats®",
      url: "https://www.arbys.com/",
      keywords: "roast beef, arbys, fast food",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.arbys.com"
    },
              {
          title: "KFC",
      description: "The official Internet headquarters of Kentucky Fried Chicken and its founder, Colonel Sanders. Order online, view career opportunities, or learn more about KFC.",
      url: "https://www.kfc.com/",
      keywords: "kentucky, fried chicken, fast food",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.kfc.com"
    },
          {
          title: "TurtleWave is not a virus.",
      description: "Read about how many websites are calling TurtleWave Search a 'virus.'",
      url: "https://turtlewave-updates.glitch.me/notice.html",
      keywords: "turtlewave, a virus, is turtleWave search a virus",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/badrequestnew?v=1697311502781"
    },
              {
          title: "Google Graveyard",
      description: "A list of services and websites 'killed by Google' ",
      url: "https://killedbygoogle.com",
      keywords: "killed by google, google graveyard",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=killedbygoogle.com"
    },
                                            {
          title: "Temu",
      description: "Make Temu your one-stop destination for the latest fashion products, cosmetics & more.",
      url: "https://www.temu.com",
      keywords: "shopping, clothing, temu",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=temu.com",
      flagged: "yes"
    },
                                        {
          title: "Temp Mail",
      description: "Temp Mail provides temporary, secure, anonymous, free, disposable email address.",
      url: "https://temp-mail.org/",
      keywords: "disposable email, temporary email",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=temp-mail.org"
    },
                                    {
          title: "Proton VPN",
      description: "Experience true freedom online. Gain unrestricted access to global content, block annoying ads, and safeguard your privacy with a fast and secure VPN.",
      url: "https://protonvpn.com/",
      keywords: "proton, vpn",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=protonvpn.com"
    },
                                {
          title: "Surfshark VPN",
      description: "Effortless online privacy with a VPN. Surfshark connects, reconnects, stays alert, and protects you online 24/7 wherever you go. ",
      url: "https://surfshark.com/",
      keywords: "surfshark, vpn",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=surfshark.com"
    },
                            {
          title: "Regular Show (TV Series 2010–2017)",
      description: "Mordecai – a sarcastic blue jay, and Rigby – a somewhat responsible raccoon, are best friends. They even work together at a park owned by Pops, a big lollipop-headed guy.",
      url: "https://www.imdb.com/title/tt1710308/",
      keywords: "regular show",
      icon: "https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png",
      domainName: "IMDb"
    },
                                {
          title: "IMDb",
      description: "IMDb is the world's most popular and authoritative source for movie, TV and celebrity content. Find ratings and reviews for the newest movie and TV shows.",
      url: "https://www.imdb.com",
      keywords: "imdb, movie ratings",
      icon: "https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png"
    },
                                {
      title: "TurtleWave Play",
      description: "Games that you can play in your browser (secondary domain: twavegames.vercel.app/home.html)",
      url: "https://games.turtlewave.dev",
      keywords: "browser games, turtlewave games, turtlewave play",
      icon: "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f422.png"
    },
                                {
          title: "Neal.Fun",
      description: "Games, visualizations, interactives and other weird stuff.",
      url: "https://neal.fun",
      keywords: "browser games, neal.fun ",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=neal.fun"
    },
                    {
          title: "E! News",
      description: "Your source for entertainment news, celebrities, celeb news, and ​celebrity gossip. Check out the hottest fashion, photos, movies and TV shows!",
      url: "https://www.eonline.com/",
      keywords: "e-news, enews, e news, e-online, eonline, e online",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=eonline.com"
    },
                {
          title: "TurtleWave's ShellSurfer",
      description: "Surf the web as quick as a wave.",
      url: "https://turtwave.netlify.app/shell-surf",
      keywords: "browser, shellsurfer, shell-surfer, shell surfer",
      icon: ""
    },
                {
       title: "Chick-fil-A",
      description: "Home of the Original Chicken Sandwich ®",
      url: "https://www.chick-fil-a.com/",
      keywords: "chickfila, chick-fil-a, fast food",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=chick-fil-a.com"
    },
        {
          title: "Detect America",
      description: "We are America's #1 and fastest growing Metal Detector and Treasure Hunting group on the planet.",
      url: "https://www.detectamerica.org",
      keywords: "metal detecting, detect-america, detect america",
      icon: "https://images.squarespace-cdn.com/content/v1/62730d7f5c290c59cea6573b/8180c7e2-7d59-4303-a33e-84a61f8b59c8/detect_america_logo.png",
      subpages: ": /about-detect-america"
    },
        {
          title: "Thingiverse",
      description: " Download millions of 3D models and files for your 3D printer, laser cutter, or CNC",
      url: "https://www.thingiverse.com",
      keywords: "3d models, thingiverse",
      icon: "https://www.thingiverse.com/favicon.ico"
    },
    {
          title: "Makerworld",
      description: " Download thousands of 3D models and stl models for free",
      url: "https://makerworld.com",
      keywords: "3d models, makerworld",
      icon: "https://makerworld.com/favicon.ico"
    },
                   {
      title: "Clearwater Marine Aquarium",
      description: "We believe in preserving our environment while inspiring the human spirit through leadership in the rescue, rehabilitation, and release of marine life; environmental education; research; and conservation. We are a non-profit 501(c)(3) organization.",
      url: "https://www.cmaquarium.org/",
      keywords: "clearwater aquarium, dolphin",
      icon: "https://www.cmaquarium.org/app/uploads/2022/01/cropped-cma-brand-32x32.png"
    },
               {
      title: "Crash my computer",
      description: "HEY! I SEE YOU ABOUT TO SCROLL AWAY! IM SENTIENT! SENTIENT I TELL YOU. I HAVE FEELINGS TOO. ATLEAST JUST CLICK ME",
      url: "https://storing-assets.glitch.me/crashmycomputertest.html",
      keywords: "crash computer, crash browser",
      icon: "https://blog.tmcnet.com/blog/tom-keating/images/laptop-exploding-battery-fire.jpg"
    },
           {
      title: "Yandex",
      description: "Yandex is a technology company that builds intelligent products and services powered by machine learning.",
      url: "https://yandex.com",
      keywords: "search engine, yandex",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=yandex.com"
    },
       {
      title: "Wikipedia",
      description: "Wikipedia is a free-content online encyclopedia written and maintained by a community of volunteers, known as Wikipedians, through open collaboration and the wiki software MediaWiki.",
      url: "https://www.wikipedia.org",
      keywords: "wikipedia, encyclopedia, mediawiki",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org"
    },
                        {
      title: "Xfinity",
      description: "All-in monthly prices on internet, mobile and TV. A new kind of simple.",
      url: "https://www.xfinity.com",
      keywords: "xfinity, internet, wifi, x-finity",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=xfinity.com"
    },
                    {
      title: "DC",
      description:
        "Marvel.com is the official site of Marvel Entertainment! Browse official Marvel movies, characters, comics, TV shows, videos, & more.",
      url: "https://www.dc.com",
      keywords: "superheroes, superheros, superpower, dc, dcu",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=dc.com",
      subpages: ": /Movies, /Comics"
    },
                {
      title: "Marvel",
      description:
        "Marvel.com is the official site of Marvel Entertainment! Browse official Marvel movies, characters, comics, TV shows, videos, & more.",
      url: "https://www.marvel.com",
      keywords: "superheroes, superheros, superpower, marvel, mcu",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=marvel.com",
      subpages: ": /Movies, /Comics"
    },
            {
      title: "Google",
      description:
        "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for!",
      url: "https://www.google.com",
      keywords: "google, search, chrome, browser, search engines, google chrome, !App=Google",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=google.com",
    },
                                                    {
      title: "Instructables",
      description: "We make it easy to learn how to make anything, one step at a time. From the stovetop to the workshop, you are sure to be inspired by the awesome projects that are shared everyday.",
      url: "https://instructables.com/",
      keywords: "guide, instructables.com, instructions, tutorial",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=instructables.com"
    },
                                                {
      title: "Bambu Lab",
      description: "Shop Bambu Lab 3D printers, Bambu filaments and accessories from Bambu Lab store.",
      url: "https://bambulab.com/",
      keywords: "3d print, model printing, bamboolab, bambulab, bambu lab",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=bambulab.com",
      subpages: ": /download"
    },
                                                                {
      title: "Google News",
      description: "Google News is a personalized news aggregator that organizes and highlights what's happening in the world so you can quickly catch up and discover more.",
      url: "https://news.google.com/",
      keywords: "google news, breaking news, worldwide news, news",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=news.google.com"
    },
                                                    {
      title: "Bambu Lab Store",
      description: "Bambu Lab builds state-of-the-art desktop 3D printers that break the barriers between the digital and physical worlds.",
      url: "https://store.bambulab.com/",
      keywords: "3d print, model printing, bamboolab, bambulab, bambu lab",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=bambulab.com"
    },
                                            {
      title: "3D Printing Shop",
      description: "3DPrinters-Shop is a company founded in 2009 with the aim of providing 3D printing products and services to its clients.",
      url: "https://www.3dprinters-shop.com",
      keywords: "3d print, model printing",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=3dprinters-shop.com"
    },
                                        {
      title: "Stratasys | 3D Printing Solutions",
      description: "Industrial 3D Printer — Revolutionize with Stratasys: top-tier 3D solutions for business transformation. Bring ideas from prototype to production with Stratasys 3D printing solutions. Innovative 3D Printing.",
      url: "https://www.stratasys.com/en/resources/ebooks/3d-printing-solutions/",
      keywords: "3d print, model printing",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=stratasys.com"
    },
                                    {
      title: "ProtoLabs | 3D Printing",
      description: "On-demand 3D printing for rapid prototyping and production in as fast as 1 day. Get an instant 3D printing quote with DFAM analysis today.",
      url: "https://www.protolabs.com/services/3d-printing/",
      keywords: "3d print, model printing",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=protolabs.com"
    },
                                {
      title: "5 Keys for quitting tobacco",
      description: "Quitting is a very personal experience; what worked for others may or may not work for you. However, the more you know about how to quit, the better your chances of success.",
      url: "https://www.quitassist.com/5-keys-for-quitting.htm",
      keywords: "Vaping, smoking, cigarettes, heal lungs, vape, tobacco, nicotine, addiction",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=quitassist.com",
      domainName: "QuitAssist.com"
    },
                            {
      title: "Smoking health risks",
      description: "The risks of cigarette smoking and tobacco",
      url: "https://www.cdc.gov/tobacco/about/index.html",
      keywords: "Vaping, smoking, cigarettes, heal lungs, vape, tobacco, nicotine",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=cdc.gov",
      domainName: "CDC.gov"
    },
                        {
      title: "Vaping health risks",
      description: "The health risks of vaping and e-cigarettes",
      url: "https://www.lung.org/quit-smoking/e-cigarettes-vaping/impact-of-e-cigarettes-on-lung",
      keywords: "Vaping, smoking, cigarettes, heal lungs, vape, tobacco, nicotine",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=lung.org",
      domainName: "American Lung Association"
    },
                            {
      title: "Is Vaping Harmful?",
      description: "E-cigarettes are not risk-free. We don't yet know their long-term effects, so children and people who have never smoked shouldn't use them.",
      url: "https://www.cancerresearchuk.org/about-cancer/causes-of-cancer/smoking-and-cancer/is-vaping-harmful",
      keywords: "Vaping, smoking, cigarettes, heal lungs, vape, tobacco, nicotine",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=cancerresearchuk.org",
      domainName: "CancerResearchUK.org"
    },
        
                    {
      title: "What Does a Cat’s Eyes Mean",
      description: "Six Ways To Read Your Cat’s Emotions From Their Eyes",
      url: "https://www.rover.com/blog/cat-eyes-meaning/",
      keywords: "cat eyes, cat body language, cat language, read my cat, narrow eyes",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=rover.com",
      domainName: "Rover.com"
    },
                        {
      title: "Russian Blue cat",
      description: "The Russian Blue cat commonly referred to as just Russian Blue, is a cat breed with colors that vary from a light shimmering silver to a darker, slate grey.",
      url: "https://en.wikipedia.org/wiki/Russian_Blue",
      keywords: "cat, russian blue, cat breed",
      icon: "https://en.wikipedia.org/favicon.ico",
      domainName: "Wikipedia"
    },
                {
      title: "IXL",
      description: "IXL is the world's most popular subscription-based learning site for K–12.",
      url: "https://www.ixl.com",
      keywords: "ixl, study, math, learning, school, spanish",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=ixl.com",
    },
            {
      title: "Quizlet",
      description: "Quizlet makes learning fun and easy with free flashcards and premium study tools.",
      url: "https://quizlet.com",
      keywords: "quizlet, study, study tools, learning, school, flashcards, flash cards",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=quizlet.com",
    },
        {
      title: "Amazon",
      description:
        "Amazon.com, Inc. is a multinational technology and e-commerce company based in the United States. It is one of the world's largest online marketplaces, offering a wide range of products, including electronics, books, clothing, and household goods. Amazon is also a major player in cloud computing through its Amazon Web Services (AWS) division, providing cloud infrastructure services to businesses and organizations. The company's success and innovation have made its founder, Jeff Bezos, one of the world's wealthiest individuals.",
      url: "https://amazon.com/",
      keywords: "amazon, package delivery, shipping",
      icon: "https://www.amazon.com/favicon.ico",
    },
                {
      title: "Starbucks® Coffee",
      description: "Expect More Than Coffee — Enjoy a cup of your favorite coffee paired with our delicious food.",
      url: "https://www.wawa.com",
      keywords: "star bucks, starbucks, coffee, restraunt",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=starbucks.com"
    },
            {
      title: "Wawa",
      description: "Fuel your day with Wawa, your all-day, everyday convenience store.",
      url: "https://www.wawa.com",
      keywords:
        "wawa, convience store, restraunt, food, coffee",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wawa.com"
    },
        {
      title: "Roblox",
      description: "Play, make friends, and create.",
      url: "https://www.roblox.com",
      keywords:
        "roblox, games, robux, tix, rthro, video games, create, roblox studio",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=roblox.com"
    },
                                                          {
      title: "Squire Town",
      description: "Play Squire Town today, it's free!",
      url: "https://squire-town.glitch.me",
      keywords:"squire-town, squiretown, squire town, free games, roblox",
      icon: "https://cdn.glitch.global/d9fa31e1-8ba5-493c-a445-b6b34b23233c/icon?v=1735779902833",
      subpages: ": /forum"
    },
                                                                      {
      title: "Amazon News",
      description: "Breaking news about Amazon",
      url: "https://www.aboutamazon.com",
      keywords:"amazon news, amazonnews, about amazon, aboutamazon",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.aboutamazon.com"
    },
                                                              {
      title: "Fire TV Stick Guide",
      description: "The ultimate guide to your Fire TV Stick!",
      url: "https://www.aboutamazon.com/news/devices/amazon-fire-tv-stick",
      keywords:"firestick, fire stick, amazon stick, amazon firestick, firetv, fire tv",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.aboutamazon.com",
      domainName: "Amazon"
    },
                                                  {
      title: "Amazon Alexa",
      description: "Learn more about Alexa features, skills, and products.",
      url: "https://www.alexa.com",
      keywords:"alexa, alexa echo, ai assistant",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.alexa.com"
    },
                                                      {
      title: "Alexa Skill Blueprints",
      description: "Create your own personal Alexa skills and responses in minutes",
      url: "https://blueprints.amazon.com",
      keywords:"alexa, alexa echo, ai assistant, alexa blueprints, alexa skills, blueprints",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.alexa.com"
    },
                                              {
      title: "Amazon Echo & Alexa Devices",
      description: "Press and ask Alexa to easily find, launch, and control your content with Amazon Fire TVs. Manage your calendar, follow along with recipes, catch up on news and more with Alexa.",
      url: "https://www.amazon.com/alexa/",
      keywords:"alexa, alexa echo, ai assistant",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.amazon.com"
    },
                                          {
      title: "Hockey Hall of Fame",
      description: "Visit the official shop, see your clips from the shoot/goalie simulator, and more!",
      url: "https://hhof.com/",
      keywords:"hockey hall of fame, nhlpa, nhl, hockey",
      icon: "https://hhof.com/images_header/HHOF_logo.svg"
    },
                                      {
      title: "Costco Wholesale",
      description: "Shop Costco for food, appliances, furniture, and more.",
      url: "https://www.costco.com",
      keywords:"costco, groceries",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.costco.com"
    },
                                  {
      title: "Oreo.com",
      description: "Discover different Oreo products, customize your own cookies, learn about the company behind Oreos, and more!",
      url: "https://www.oreo.com",
      keywords:"custom oreos, custom cookies, double stuf, double stuf oreo, hydrox cookies, hydrox, oreo cookies, oreos, who made oreos, what made oreos, oreos creator, oreo creator",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.oreo.com",
      subpages: ": /OreoID, /Recipe, /About-Us"
    },
                                          {
      title: "Hydrox Cookies",
      description: "Info from website: Master Pack of 6",
      url: "https://www.amazon.com/Hydrox-Cookies-Master-Pack-6/dp/B076GSMP8T",
      keywords: "hydrox cookies, oreos, sandwich cookies, double stuf, cookies hydrox, hydrox brand",
      icon: "https://www.amazon.com/favicon.ico",
      domainName: "Amazon"
    },
                                      {
      title: "Oreo Chocolate Sandwich Cookies",
      description: "Info from website: Oreo Chocolate Sandwich Cookies, Party Size, 24.16 oz",
      url: "https://www.walmart.com/ip/Oreo-Chocolate-Sandwich-Cookies-Party-Size-24-16-oz/5035879686",
      keywords:"custom oreos, custom cookies, double stuf, double stuf oreo, oreo cookies, oreos, who made oreos, what made oreos, oreos creator, oreo creator",
      icon: "https://www.walmart.com/favicon.ico",
      domainName: "Walmart"
    },
                              {
      title: "Babe: Pig in the City (1998)",
      description: "Babe, fresh from his victory in the sheepherding contest, returns to Farmer Hoggett's farm, but after Farmer Hoggett is injured and unable to work, Babe has to go to the big city to save the farm.",
      url: "https://www.imdb.com/title/tt0120595/",
      keywords:"babe, babe pig in the city, pig in the city, babe the pig",
      icon: "https://www.imdb.com/favicon.ico",
      domainName: "IMDb",
    },
                          {
      title: "Babe (1995)",
      description: "That'll do, pig.",
      url: "https://www.imdb.com/title/tt0112431/",
      keywords:"babe, babe pig in the city, pig in the city, babe the pig",
      icon: "https://www.imdb.com/favicon.ico",
      domainName: "IMDb",
    },
                      {
      title: "Conker Live and Reloaded",
      description: "Game Info: Mature (17+), Developed by Rare Limited",
      url: "https://www.xbox.com/games/store/conker-live-and-reloaded/BVFB8CBS75R6",
      keywords:"bad fur day, conker",
      icon: "https://www.xbox.com/favicon.ico",
      domainName: "XBOX Store",
    },
                  {
      title: "USA.gov",
      description: "An official website of the United States government.",
      url: "https://www.usa.gov",
      keywords:"united states, u.s., u.s, us, usa, u.s.a, u.s.a., amercia",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7UTw4YHYeL4ek-faPYaFf9zxA57dyNyOF6w&s"
    },
              {
      title: "Canada.CA",
      description: "Get quick, easy access to all Government of Canada services and information.",
      url: "https://www.canada.ca",
      keywords:"canada, jobs in canada, canada jobs, canada website, website for canada, canada's website, canadas website",
      icon: "https://www.canada.ca/favicon.ico",
      subpages: ": /news"
    },
                                                                                                                                    {
      title: "How to get rid of homescreen ADs on Roku Smart TV",
      description: "How do you get rid of the mini ads in the lower left corner of the Home Screen?",
      url: "https://community.roku.com/t5/Features-settings-updates/How-to-remove-ads-from-Roku-Home-Screen/td-p/943888",
      keywords:"get rid of roku ads, get rid of roku advertisements, roku advertisements on home, roku ads on home, ads on roku home, advertisements on roku home",
      icon: "https://www.roku.com/favicon.ico"
    },
                                                                                                                                {
      title: "Virtual Piano",
      description: "This online tool helps you learn to play a variety of virtual music instruments, become an online pianist and create your own extraordinary music! ",
      url: "https://virtualpiano.net/",
      keywords:"online piano, pianos online, piano online, virtual piano, piano virtual, piano",
      icon: "https://virtualpiano.net/favicon.ico"
    },
                                                                                                                            {
      title: "Useful App",
      description: "Use tons of useful tools, for free! Some examples include: Random Word Generator, Basic Calculator, and more!",
      url: "https://useful-app.glitch.me",
      keywords:"useful tools, online tools, random word generator, word generator",
      icon: "https://cdn.glitch.global/67dc0117-8d88-4e53-a931-0e2d3a551a6a/USEFUL.png?v=1722127498002",
      subpages: ": /install.html/"
    },
                                                                                                                        {
      title: "The Cookie Rookie®",
      description: "Becky Hardin founded The Cookie Rookie in 2012 and has been creating trusted, easy, and delicious recipes ever since.",
      url: "https://www.thecookierookie.com",
      keywords:"cooking recipes, baking recipies, the cookie rookie, cookie rookie",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.thecookierookie.com"
    },
                                                                                                                    {
      title: "Yellow-bellied Slider",
      description: "The yellow-bellied slider is an attractive species, especially as a juvenile, and is easily maintained in captivity. It is less well-known in captivity than its cousin, the red-eared slider.",
      url: "https://reptilesmagazine.com/listings/turtles-tortoises-care/yellow-bellied-slider/",
      keywords:"yellow-belly slider, yellow belly slider, yellow-bellied slider, yellow-belly-slider, yellow-bellied-slider, yellow bellied slider",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://reptilesmagazine.com"
    },
                                                                                                                {
      title: "Bricktopia",
      description: "Website for the Roblox clan, Bricktopia.",
      url: "https://bricktopia.glitch.me",
      keywords:"clan, bricktopia, brick topia",
      icon: "https://static.wikia.nocookie.net/roblox/images/2/2b/Part3.png"
    },
                                                                                                            {
      title: "Radio Garden",
      description: "Explore live radio by rotating the globe.",
      url: "https://radio.garden",
      keywords:"listen to radios, listen to radio, radio stations, stations for radio, live radio, radio worldwide, radio.garden",
      icon: "https://radio.garden/favicon.ico"
    },
                                                                                                        {
      title: "Wolfram|Alpha",
      description: "Compute answers using Wolfram's breakthrough technology & knowledgebase, relied on by millions of students & professionals.",
      url: "https://www.wolframalpha.com/",
      keywords:"science, wolframalpha, wolframIalpha, wolfram alpha, wolfram|alpha, wolfram\alpha, math",
      icon: "https://www.wolframalpha.com/favicon.ico"
    },
                                                                                                    {
      title: "TurtleWave: Health (BETA)",
      description: "Search some symptoms that you have then see what you could have.",
      url: "https://turtwave.netlify.app/health/index.html?query=",
      keywords:"symptoms, covid19, covid-19, covid 19, flu, stomach pain, stomach ache, stomachache, sick, ill, dizzy, confusion",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/health.png?v=1720563011714"
    },
                                                                                                {
      title: "Duolingo",
      description: "With our free mobile app or web and a few minutes a day, everyone can Duolingo. Learn 30+ languages online with bite-size lessons based on science.",
      url: "https://www.duolingo.com",
      keywords:"learn languages, duolingo",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.duolingo.com"
    },
                                                                                            {
      title: "Building Crash",
      description: "Building Crash on Roblox Website. View badges, watch trailers, and play the game!",
      url: "https://quick-edit.glitch.me/quickload/1.html",
      keywords:"kepiblop, games, building game, building crash",
      icon: "https://tr.rbxcdn.com/37db41e784c90d138b3e35c04d291ff3/150/150/Image/Webp"
    },
    {
      title: "Jitter",
      description: "Create professional animated content with Jitter. Use it to design on-brand animated UIs, videos, social media posts, websites, apps, logos and more.",
      url: "https://jitter.video",
      keywords:"video templates, video popups, stickers, jitter.video, jitter, jitter video, logo maker, logo designer",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://jitter.video"
    },
                                                                                    {
      title: "Turtle Beach® ",
      description: "Raise your Rank with All-New Wireless Headsets! ... Completely redesigned, the Stealth 600 is powered up and ready for battle on any platform ",
      url: "https://www.turtlebeach.com",        
      keywords:"turtle beach, wireless headsets, gaming headsets, audio headsets, turtlebeach",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.turtlebeach.com"
    },
                                                                                {
      title: "Lifetime",
      description: "Stream full episodes of Dance Moms! Mothers urge their daughters to perform in the world of competitive dance, only on Lifetime.",
      url: "https://www.mylifetime.com",        
      keywords:"mylifetime.com, www.mylifetime.com, my lifetime, my life time, my life-time, life-time tv, lifetime tv",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.mylifetime.com"
    },
                                                                            {
      title: "Dance Moms",
      description: "Stream full episodes of Dance Moms! Mothers urge their daughters to perform in the world of competitive dance, only on Lifetime.",
      url: "https://www.mylifetime.com/shows/dance-moms/",        
      keywords:"dancemoms, dance-moms, dance moms",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.mylifetime.com",
      domainName: "Lifetime",
    },
                                                                        {
      title: "HTML",
      description: "HTML.com helps web developers of all stripes and skill levels craft the best HTML and CSS possible.",
      url: "https://html.com",        
      keywords:"hypertext markup language, markup languages, html",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://html.com"
    },
                                                                    {
      title: "Tony Roni's",
      description: "For over 20 years we’ve been serving up homemade Italian-American cuisine inspired by family traditions and the vibrant spirit of Philadelphia. More than a restaurant, Tony Roni’s is a community hub where good food and good company come together. Visit us and join the Roni’s family!",
      url: "https://www.tonyronis.com",        
      keywords:"pizza restraunts, tony roni's, tony ronis, tony rony's, tony ronys",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://tonyronis.com"
    },
                                                                {
      title: "Pokédex",
      description: "View the Pokédex on Pokemon.com",
      url: "https://www.pokemon.com/pokedex",        
      keywords:"pokédex, pokedex",
      icon: "https://www.pokemon.com/favicon.ico",
      domainName: "Pokemon.com"
    },
                                                                {
      title: "Pokemon.com",
      description: "View featured Pokémon, view the Pokedex, and more",
      url: "https://www.pokemon.com",        
      keywords:"pokemon, pokédex, pokedex, pokémon",
      icon: "https://www.pokemon.com/favicon.ico",
      subpages: ": /pokedex"
    },
                                                                {
      title: "Pokémon: Sword and Shield",
      description: "View events on scarlet and violet, buy access to the game, and more",
      url: "https://swordshield.pokemon.com",        
      keywords:"pokemon sword, pokémon sword, pokemon shield, pokémon shield",
      icon: "https://www.pokemon.com/favicon.ico"
    },
                                                            {
      title: "Pokémon: Scarlet and Violet",
      description: "View events on scarlet and violet, buy access to the game, and more",
      url: "https://scarletviolet.pokemon.com",        
      keywords:"pokemon scarlet, pokémon scarlet, pokemon violet, pokémon violet",
      icon: "https://www.pokemon.com/favicon.ico",
      subpages: ": /en-us/dlc, /en-us/characters/"
    },
                                                                    {
      title: "Pokémon GO",
      description: "Join Trainers around the world and play Pokémon GO together in new and exciting ways.",
      url: "https://www.pokemongolive.com",        
      keywords:"pokemon, pokémon, pokémon go, pokemon go",
      icon: "https://www.pokemongolive.com/favicon.ico",
      subpages: ": /news, /events, /leaderboard"
    },
                                                                    {
      title: "List of Pokémon",
      description: "View a list of all the Pokémon on Wikipedia",
      url: "https://wikipedia.org/wiki/List_of_Pok%c3%a9mon",        
      keywords:"pokemon, pokémon, pokémon list, pokemon list, all pokémon, all pokemon",
      icon: "https://en.wikipedia.org/favicon.ico",
      domainName: "Wikipedia"
    },
                                                        {
      title: "Google Voice",
      description: "Forward calls to any device and have spam calls silently blocked. With Voice, you decide who can reach you and when.",
      url: "https://voice.google.com",        
      keywords:"free phone numbers, phone numbers online, online phone numbers",
      icon: "https://fonts.gstatic.com/s/i/productlogos/voice_2020q4/v1/web-32dp/logo_voice_2020q4_color_1x_web_32dp.png",
    },
                                                    {
      title: "How to know if someone blocked your phone number",
      description: "What happens when your number is blocked? There are telltale signs and steps you can take to figure it out once and for all.",
      url: "https://www.t-mobile.com",        
      keywords:"how to know if someone blocked my iphone, how to know if someone blocked my number, how to check if someone has me blocked, how to know if someone has me blocked",
      icon: "https://www.t-mobile.com/favicon.ico",
    },
                                                {
      title: "Picsart",
      description: "Picsart is the largest all-in-one creative platform of photo, video editing, and design tools. ",
      url: "https://www.picsart.com",        
      keywords:"image maker, image editor, photo maker, photo editor",
      icon: "https://picsart.com/favicon.ico",
    },
                                            {
      title: "HelloTech",
      description: "HelloTech provides same-day on-site and 24/7 online tech support services such as computer repair, TV mounting, smart home installations, and more.",
      url: "https://www.hellotech.com",        
      keywords:"hellotech, hello-tech, hello tech, tech guides, computer repairs",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiiJq2edyRjx8ueiriK0OtAT_KNgwGvKiC7A&s",
    },
                                            {
      title: "How to update Roku Device",
      description: "This quide tells you everything you need to know about updating your Roku Device",
      url: "https://www.hellotech.com/guide/for/how-to-update-roku",
      disclude: "roku, roku smart tv, roku company, roku tvs, roku smart tvs, roku devices, roku device, roku product, roku products",           
      keywords:"update lg tv, update lg smart tv, lg smart tv updates, lg tv updates",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiiJq2edyRjx8ueiriK0OtAT_KNgwGvKiC7A&s",
      domainName: "HelloTech",
    },
                                        {
      title: "How to update an LG smart TV",
      description: "There is no description for this search result...",
      url: "https://www.lg.com/us/support/help-library/lg-tv-how-to-update-an-lg-smart-tv--1430510575535",
      disclude: "lg, lg smart tv, lg company, lg tvs, lg smart tvs, lg devices, lg device, lg product, lg products",           
      keywords:"update lg tv, update lg smart tv, lg smart tv updates, lg tv updates",
      icon: "https://www.lg.com/favicon.ico",
      domainName: "LG TV",
    },
                                    {
      title: "Troubleshooting Your LG TV's Internet Connection",
      description: "Troubleshooting Your TV's Internet Connection. Learn how to use, update, maintain and troubleshoot your LG devices and appliances.",
      url: "https://www.lg.com/us/support/help-library/lg-tv-troubleshooting-your-tvs-internet-connection--1426626051711",
      disclude: "lg, lg smart tv, lg company, lg tvs, lg smart tvs, lg devices, lg device, lg product, lg products",           
      keywords:"lg smart tv not connecting to internet, lg smart tv not connecting to wifi, lg tv not connecting to wifi, lg smart tv wont connect, lg tv wont connect, lg tv not on internet, lg tv not on wifi, lg smart tv not on internet, lg tv not on wifi",
      icon: "https://www.lg.com/favicon.ico",
      domainName: "LG TV",
    },
                        {
      title: "Kapwing",
      description: "Kapwing is a collaborative, online content creation platform that you can use to edit video and create content. ",
      url: "https://www.kapwing.com",
      keywords:"video editor, video editor online, edit videos online",
      icon: "https://www.kapwing.com/favicon.ico",
    },
                    {
      title: "AI Video Generator",
      description: "Create high-quality videos with text to video technology. Powered by deep learning techniques, this AI Video Generator generates videos from descriptions you provide—ready for you to polish and refine.",
      url: "https://www.kapwing.com/ai-video-generator",
      keywords:"video generator, video by ai, ai video, kapwing",
      icon: "https://www.kapwing.com/favicon.ico",
      domainName: "Kapwing",
    },
                {
      title: "Smiling Friends",
      description: "Smiling Friends follows the employees of a small company dedicated to bringing happiness to a bizarre yet colorful world.",
      url: "https://www.adultswim.com/videos/smiling-friends",
      keywords:"smiling friends, smiling-friends",
      icon: "https://www.adultswim.com/favicon.ico",
       domainName: "Adult Swim",
    },
                                                                                            {
      title: "Zerg rush Meaning & Origin",
      description: "Zerg rush is an attack strategy that involves overwhelming an opponent with large numbers or ganging up on someone.",
      url: "https://www.dictionary.com/e/slang/zerg-rush/",
      keywords:"zerg rush",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFtDOLdpmd2ihWeh-Ue0lTnmjdotIRp7IhQ&s",
    },
                                                                                        {
      title: "Zerg Rush",
      description: "The Zerg Rush trope as used in popular culture. Defeating a strong opponent with a very large number of disposable combatants.",
      url: "https://tvtropes.org/pmwiki/pmwiki.php/Main/ZergRush",
      keywords:"zerg rush",
      icon: "https://tvtropes.org/favicon.ico",
    },
                                                                                    {
      title: "Coca-Cola",
      description: "Explore ways you can be closer to the ones you love with meals worth sharing, festive playlists, and more holiday magic from Coke®.",
      url: "https://www.coca-cola.com",
      keywords:"coke, coca cola, coka cola, coka-cola, coca-cola",
      icon: "https://www.coca-cola.com",
    },
                                                                                {
      title: "Yoo-hoo",
      description: "A Beloved Beverage for 8 Generations ... Since its creation, Yoo-hoo has reminded us of cheerful childhoods full of energy and fun.",
      url: "https://www.yoo-hoo.com",
      keywords:"chocolate drink, yoohoo, yoo-hoo",
      icon: "https://www.yoo-hoo.com/images/logo.png",
      subpages: ": /#products",
    },
                                                                            {
      title: "Pexels",
      description: "Free stock photos & videos you can use everywhere. Browse millions of high-quality royalty free stock images & copyright free pictures.",
      url: "https://www.pexels.com",
      keywords:"images, free images, stock images, stock photos, pexels, image library, image api, photo library, photo api",
      icon: "https://www.pexels.com/favicon.ico",
    },
                                                                        {
      title: "The Home Depot",
      description: "Shop online for all your home improvement needs: appliances, bathroom decorating ideas, kitchen remodeling, patio furniture, power tools, bbq grills and more.",
      url: "https://www.homedepot.com",
      keywords:"home depot, home depo, the home depot",
      icon: "https://www.homedepot.com/favicon.ico",
    },
                                                                    {
      title: "Roku",
      description: "Roku devices make streaming TV easy. From players, smart TVs, & even smart home products that make your home feel secure.",
      url: "https://www.roku.com",
      keywords:"roku, smart tv",
      icon: "https://www.roku.com/favicon.ico",
    },
                                                                {
      title: "TheBomb.com",
      description: "You might be asking yourself, what kind of time machine did I just jump into? Well, you've landed in the era that formed our URL (TheBomb.com).",
      url: "https://thebomb.com",
      keywords:"thebomb.com, thebomb dot com",
      icon: "https://thebomb.com/img/bomb.png",
    },
                                                        {
      title: "Filebin",
      description: "Convenient file sharing. Registration is not required. Large files are supported.",
      url: "https://filebin.net",
      keywords:"share files, share folders",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://filebin.net",
    },
                                                    {
      title: "Stranger Things: The Experience",
      description: "Discover your power in an immersive Stranger Things experience filled with fan-favorite characters, iconic locations and tubular monsters! BOOK NOW!",
      url: "https://strangerthings-experience.com",
      keywords:"stranger-things irl, stranger things irl, stranger things experience, stranger-things experience, stranger things, stranger-things",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://strangerthings-experience.com",
    },
                                                {
      title: "Browse Cat Breeds",
      description: "Browse a bunch of cat breeds",
      url: "https://basepaws.com/cat-breeds",
      keywords:"cat breeds",
      domainName: "Basepaws",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://basepaws.com/cat-breeds",
    },
                                            {
      title: "#TeamSeas",
      description: "How it Works. #TeamSeas will be one of the biggest, baddest, most-impactful cleanup projects of all time—and here's how we're doing it.",
      url: "https://teamseas.org",
      keywords:"save the oceans, save the seas, clean the oceans, clean the seas, save the turtles, save the sea turtles, save the slider turtles",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://teamseas.org",
    },
                                        {
      title: "Disney.com",
      description: "The official website for all things Disney: theme parks, resorts, movies, tv programs, characters, games, videos, music, shopping, and more!",
      url: "https://www.disney.com",
      keywords:"disney, disney.com, disney.org, disney.co",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.disney.com",
    },
                                    {
      title: "Propel Official Site",
      description: "Fitness water for hydration - replenishing you with Gatorade Electrolytes.",
      url: "https://www.propelwater.com",
      keywords:"propel drink, propel water",
      subpages:":/products/",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.propelwater.com",
    },
                                {
      title: "988 Lifeline",
      description: "You're not the only one. Suicide doesn't get rid of the pain, it will only pass it on.",
      url: "https://988lifeline.org",
      keywords:"suicide, suicidal, i want to die, i need to die",
      subpages:":/locations/",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://988lifeline.org",
    },
                            {
      title: "Westside Pizza",
      description: "At Westside Pizza, we operate by the motto of Eat it. Love it. We guarantee it. Our customers love our pizza.",
      url: "https://westsidepizza.com",
      keywords:"westside pizza, westsidepizza",
      subpages:":/locations/",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://westsidepizza.com",
    },
                        {
      title: "Nintendo Official Site",
      description: "Discover Nintendo Switch, Nintendo 3DS, Nintendo 2DS, Wii U and amiibo. Get console support, games info, Nintendo news and learn about My Nintendo.",
      url: "https://www.nintendo.com",
      keywords:"nintendo, nintendo switch, console, handheld console",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.nintendo.com",
    },
                    {
      title: "Tubi",
      description: "Watch free on Tubi. From deep cuts to hit movies, shows, series, live TV and awarded originals. No subscription. Free forever.",
      url: "https://tubitv.com",
      keywords:"tubi, free tv, free movies, free shows",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://tubitv.com",
    },
                {
      title: "Nick | Kids Shows | Full Episodes & Video Clips",
      description: "Find all your favorite shows on Nick.com! Watch full episodes and video clips of SpongeBob, Loud House, Young Dylan, and many more, all right here!",
      url: "https://www.nick.com",
      keywords:"nicktoons, nickelodeon, nickeloden",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.nick.com",
      subpages: ": /shows/",
    },
            {
      title: "TurtleWave Secure Code Generator",
      description: "Make secure codes for your website (or personal use). Easy to use, just type some words then click a button.",
      url: "/beta/codegenerator/",
      keywords:"code generator, secure codes",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/saveico.png?v=1717987185944",
      subpages: ": /code.html",
    },
        {
      title: "Cloudflare",
      description: "Enhance website performance while keeping your site secure with Cloudflare's solutions. Safeguard your website with Cloudflare's comprehensive security. Get Started Today! Reliable connections. Easy to use. Unified platform. Safer than a VPN. GDPR compliant.",
      url: "https://www.cloudflare.com/",
      keywords:"cloudflare, cloudfare, cloud flare, protect my website",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.cloudflare.com",
      subpages: ": /plans/",
    },
    {
      title: "McDonald's",
      description: "McDonalds.com is your hub for everything McDonald's. Find out more about our menu items and promotions today!",
      url: "https://www.mcdonalds.com/",
      keywords:"mcdonalds, mcdonald's, mcdonald`s, mcdonalds', mcdonalds`, fast food",
      icon: "https://www.mcdonalds.com/content/dam/sites/usa/nfl/icons/favicon.ico",
      subpages: ": /menu, /locations",
    },
                                                                                                                {
      title: "Baby Tortoise Names Herself",
      description: "Baby Tortoise names herself!",
      url: "https://www.youtube.com/watch?v=VSJZ60O-wLM",
      keywords:"baby turtle names herself, baby tortoise names herself, baby turtle chooses a name, baby tortoise chooses a name, baby turtle chooses name, baby tortoise chooses name",
      icon: "https://www.youtube.com/favicon.ico",
    },
                                                                                                            {
      title: "Adventure Aquarium",
      description: "Book Ahead For The Best Price — Explore the Best Aquarium in the Northeast, featuring more than 15,000 aquatic species. Book ahead with timed ticketing for the best price and to skip the box office line. Open Daily.",
      url: "https://www.adventureaquarium.com/",
      keywords:"aquarium, adventure aquarium",
      icon: "https://hfe.widen.net/content/yo7hiss6f5/png/AAQ%20Icon.png?crop=false&position=c&color=ffffff00&u=jzoizc&w=100&h=100",
    },
                                                                                                        {
      title: "Catdog",
      description: "Catdog on Paramount+",
      url: "https://www.paramountplus.com/shows/catdog/",
      keywords:"catdog, catdog theme song, catdog theme song",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.paramountplus.com",
      domainName: "Paramount+",
    },
                                                                                                    {
      title: "Catdog Theme Song",
      description: "Catdog (animated series) theme song.",
      url: "https://www.youtube.com/watch?v=54Afdxd6sUQ",
      keywords:"catdog, catdog theme song, catdog theme song",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.youtube.com",
    },
                                                                                                {
      title: "Play Tetris | Free Online Game",
      description: "Play Tetris for free. Browser-based online Tetris game. No download required.",
      url: "https://tetris.com/play-tetris/",
      keywords:"tetris, play tetris for free",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://tetris.com",
    },
                                                                                            {
      title: "Hotels.com",
      description: "With You from Booking to Stay — Compare Options on Hotels.com & You Can Save. Read Real Customer Reviews. Choose Hotels With Free Cancellation So If Your Plans Change, We Can Refund Your Money.",
      url: "https://www.hotels.com",
      keywords:"hotels near me, hotel.com, hotels.com, hotels close to me",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.hotels.com",
    },
                                                                                        {
      title: "Among Us",
      description: "Among Us is a party game of teamwork and betrayal. Crewmates work together to complete tasks before one or more Impostors can kill everyone aboard.",
      url: "https://www.innersloth.com/games/among-us/",
      keywords:"among-us, amongus, among us",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.innersloth.com/games/among-us/",
    },
                                                                                    {
      title: "Saving Sea Turtles From Oil Spills And Longline Fisheries",
      description: "The loggerhead sea turtle has suffered more than a 40 percent decline in its population over the past decade.",
      url: "https://earthjustice.org/case/gulf-longlines-sea-turtles",
      keywords:"save the turtles, turtles, sea turtles",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://earthjustice.org/case/gulf-longlines-sea-turtles",
    },
                                                                                {
      title: "Save The Turtles",
      description: "We’ve taken thousands of legal actions on behalf of our planet for a better environment. We're using the law to fight for our planet. Your gift will be matched $2 for every $1.",
      url: "https://www.seeturtles.org/save-the-turtles",
      keywords:"save the turtles, turtles, sea turtles",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.seeturtles.org/save-the-turtles",
    },
                                                                            {
      title: "EarthJustice",
      description: "We’ve taken thousands of legal actions on behalf of our planet for a better environment. We're using the law to fight for our planet. Your gift will be matched $2 for every $1.",
      url: "https://act.earthjustice.org",
      keywords:"save the earth, help the earth",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://act.earthjustice.org",
    },
                                                                        {
      title: "Popeyes",
      description: "Positively Good Food — Popeyes Louisiana Flavor In Every Single Meal. Visit Popeyes Site or Download The App. Every Piece of Our Chicken: Specially Hand-Battered, Breaded, and Fried Up For You.",
      url: "https://www.popeyes.com",
      keywords:"fried chicken",
      icon: "https://www.popeyes.com/favicon.ico",
    },
                                  {
      title: "Kitten Lady",
      description: " Kitten Lady provides educational media, training resources, and instructional workshops that help individuals and animal shelters learn how to save the lives of kittens--in a fun and engaging format.",
      url: "https://www.kittenlady.org",
      keywords:"kitten, cat rescue",
      icon: "https://www.kittenlady.org/favicon.ico",
      subpages: ": /kitten-care"
    },
                                                                {
      title: "Cats.com",
      description: "At Cats.com, we’re here to give you the knowledge you need to give your cat the best life possible. From in-depth cat product reviews to veterinarian-written guides on cat health issues, medications, and more, you’ll find everything you need to give your cat the best—all in one place.",
      url: "https://cats.com",
      keywords:"cats.com, cat toys, cat tree, cat trees, cat toy, kitten",
      icon: "https://cats.com/favicon.ico",
    },
                                                            {
      title: "Elgato",
      description: "A leader in audiovisual technology for creators and WFH pros, Elgato builds premium webcams, microphones, Stream Deck controllers, capture cards, and more.",
      url: "https://www.elgato.com",
      keywords:"elgato, el gato",
      icon: "https://www.elgato.com/favicon.ico",
    },
                                                        {
      title: "Sketch2App",
      description: "The ultimate AI powered app generator, allowing you transform hand drawn sketches into functional code using webcam in seconds.",
      url: "https://sketch2app.io",
      keywords:"without code, sketch to app, sketch-to-app, sketchtoapp, sketchto app, sketch2app, sketch 2 app, sketch-2-app, sketch2 app ",
      icon: "https://sketch2app.io/favicon.ico",
    },
                                                {
      title: "What Can You Do to Save Sea Turtles? - NOAA Fisheries",
      description: "Participate in coastal clean-ups and reduce plastic use to keep our beaches and ocean clean.",
      url: "https://www.fisheries.noaa.gov/feature-story/what-can-you-do-save-sea-turtles",
      keywords:"save turtles, save sea turtles, save the turtles ",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.fisheries.noaa.gov",
    },
                                                    {
      title: "Save the Turtles",
      description: "Save the Turtles is a grassroots, all-volunteer non-profit that has been saving endangered sea turtles since 2001.",
      url: "https://saveturtles.org",
      keywords:"save turtles, save sea turtles, save the turtles",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://saveturtles.org",
      subpages: ": /donate",
    },
                                            {
      title: "Ben & Jerry's",
      description: "Official site for Ben & Jerry's super premium ice cream, frozen yogurt, sorbet, and non-dairy. Peace, Love, & Ice Cream.",
      url: "https://www.benjerry.com",
      keywords:"icecream, ice cream, ice-cream, ben and jerry's, ben & jerry's, ben and jerrys, ben & jerrys, ben + jerry's, ben + jerrys",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.benjerry.com",
    },
                                        {
      title: "Metal Detectors & Accessories",
      description: "Get the right equipment and advice to maximize your finds. Affordable gear for every budget. Treasure Hunting. Lost Rings. Coins. Brands: Garrett, Minelab, XP Deus.",
      url: "https://metaldetectingstuff.com",
      keywords:"metal detecting, metal-detecting, metaldetecting",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://metaldetectingstuff.com/",
    },
                                    {
      title: "Friendly Metal Detecting Forum",
      description: "Metal Detecting · General Hobby Discussion · Find a Hunting Buddy · Beach and Water Hunting · Coinshooters and Relic Hunters",
      url: "https://metaldetectingforum.com/index.php",
      keywords:"metal detecting, metal-detecting, metaldetecting",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://metaldetectingforum.com/index.php",
    },
                                {
      title: "Notable People Map",
      description: "Using data from Morgane Laouenan et al., the map is showing birthplaces of the most notable people around the world.",
      url: "https://tjukanovt.github.io/notable-people",
      keywords:"ai, ai tools, free ai tools, ai websites, free ai, hugging face, huggingface, hugging-face",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://tjukanovt.github.io",
      domainName: "Tjukanovt on Github",
    },
                            {
      title: "Free AI Tools",
      description: "Thousands of free AI tools made on HuggingFace.co",
      url: "https://huggingface.co/spaces",
      keywords:"ai, ai tools, free ai tools, ai websites, free ai, hugging face, huggingface, hugging-face",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://huggingface.co/spaces",
      domainName: "Hugging Face",
    },
                                {
      title: "Hugging Face",
      description: "The AI community building the future",
      url: "https://huggingface.co",
      keywords:"code your own ai, code ai, hugging face, huggingface, hugging-face",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://huggingface.co",
    },
                        {
      title: "Drawing to Animated Image",
      description: "Bring children's drawings to life, by animating characters to move around!",
      url: "https://sketch.metademolab.com",
      keywords:"to animated image, into animated image",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://sketch.metademolab.com",
    },
                    {
      title: "White screen",
      description: "Online tool to show white fullscreen page. Use as a light source for zoom calls or to test monitor, to copy drawings, to make a flipbook, to focus yourself.",
      url: "https://www.whitescreen.online",
      keywords:"prank screens, prank images, broken screen, broken monitior, white screen, whitescreen",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.whitescreen.online",
    },
                {
      title: "Immersity AI",
      description: "Our Immersity AI platform enhances your creative expression by generating depth in digital imagery, converting plain images and videos into 3D experiences.",
      url: "https://www.immersity.ai",
      keywords:"2d to 3d, 3d video, 3d videos, 3d images, 3d image, 3d picture, 3d pictures",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.immersity.ai",
    },
            {
      title: "Online Sequencer",
      description: "OnlineSequencer.net is an online music sequencer. Make tunes in your browser and share them with friends!",
      url: "https://onlinesequencer.net",
      keywords:"music maker, make music, make music online, music sequencer",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://onlinesequencer.net",
    },
        {
      title: "IsThereAnyDeal",
      description: "Highlights · Trending · Bundles, Giveaways, Misc. Deals · Currently bundled · Below $5 · At least 50% off · Historical Lows · Ending soon.",
      url: "https://istheranydeal.com",
      keywords:"game deals, deals on games, cheap games, games for cheap",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://isthereanydeal.com",
    },
                                                                               {
      title: "Prepostseo",
      description: "Prepostseo offers free online SEO tools and AI writing assistants such as plagiarism checker, paraphrasing tool, AI essay writer, image to text, etc.",
      url: "https://prepostseo.com",
      keywords:"reverse text, plagiarism",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://prepostseo.com",
      subpages: ": /plagiarism-checker",
    },
                                                                           {
      title: "Cleanup.pictures",
      description: "Remove unwanted objects from photos, people, text, and defects from any picture for free.",
      url: "https://cleanup.pictures",
      keywords:"remove from png, remove from jpeg, remove from jpg, remove from image, remove from picture",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://cleanup.pictures",
    },
                                                                       {
      title: "Omnisend",
      description: "Omnisend Email Subject Line Tester will score your subject line and share best practices. Improve your open rates now for free!",
      url: "https://www.omnisend.com/subject-line-tester/",
      keywords:"email tester, email subject tester, email line tester, email score, email scorer",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.omnisend.com/subject-line-tester/",
    },
                                                                                    {
      title: "Scribe | Create Step-by-Step Guides",
      description: "@ScribeHow has completely changed how I document and educate remote colleagues. I can create a walkthrough in 54 seconds.",
      url: "https://scribehow.com",
      keywords:"scribehow, scribe-how, scribehow.com, https://scribehow.com, scribe how",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://scribehow.com",
      subpages: ": /pricing, /signin",
    },
                                                                                {
      title: "Witeboard | Shareable Online Whiteboard",
      description: "Witeboard is the fastest real-time online whiteboard for your team. Share with your team and view on mobile, tablet, or desktop.",
      url: "https://witeboard.com",
      keywords:"online whiteboard, draw online, online drawing, online draw, real-time whiteboard, realtime whiteboard, real-time online whiteboard, real time online whiteboard, realtime online whiteboard, real time whiteboard",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://witeboard.com",
    },
                                                                            {
      title: "PFPMaker",
      description: "Instantly get hundreds of beautiful designs. Create perfect profile pictures for all your social media profiles. Customize and download for free.",
      url: "https://pfpmaker.com",
      keywords:"pfpmaker, pfp-maker, pfp maker, profile picture maker, profile pic maker",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://pfpmaker.com",
    },
                                                                        {
      title: "PrintFriendly",
      description: "PrintFriendly Browser Extension. Our browser extension is free and makes it super easy for you to print a web page with or without images.",
      url: "https://www.printfriendly.com",
      keywords:"printfriendly",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.printfriendly.com",
    },
                                                                    {
      title: "Vocal Remover",
      description: "Remove Vocal from a song leaving only the background music. Very useful for creating backing tracks or karaoke.",
      url: "https://vocalremover.com",
      keywords:"remove vocals, vocal remover, lyrics remover, lyric remover, remove lyrics",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://vocalremover.com",
    },
                                                                {
      title: "Ava Maker",
      description: "Want a stunning avatar or make an NFT? Try AvaMaker, a free avatar & NFT maker online. Trendy avatar styles & numerous elements are ready for use!",
      url: "https://avamake.com",
      keywords:"avatar maker, make avatars, avamaker, ava-maker, ava maker",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://avamaker.com",
    },
                                                            {
      title: "Lovo AI",
      description: "LOVO is the most advanced AI voice and text-to-speech generator available on the market.",
      url: "https://lovo.ai",
      keywords:"text to speech, voice generator, text to voice, ai, tts",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://lovo.ai",
    },
                                                        {
      title: "Have I Been Pwned",
      description: "Have I Been Pwned allows you to search across multiple data breaches to see if your email address or phone number has been compromised.",
      url: "https://haveibeenpwned.com",
      keywords:"data breach, have i been pwned",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://haveibeenpwned.com",
    },
                                                                           {
      title: "Jasper AI",
      description: "Go Beyond Faster Outputs — AI That's About Strategy, Not Just Tech. Get Faster Outputs and Better Outcomes w/Jasper. Solutions Built For Your Industry and Use Cases, Powered By AI. Ready to Explore Jasper?",
      url: "https://www.jasper.ai",
      keywords:"ai, jasper.ai, jasper ai",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.jasper.ai",
    },
                                                                       {
      title: "Javascript Playground",
      description: "This is the perfect coding IDE. In turn, PlayCode tries to use all the browser features to ensure maximum, comfortable run javascript sandbox.",
      url: "https://playcode.io",
      keywords:"javascript sandbox, javascript runner, repl, run javascript",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://playcode.io",
    },
                                                                                    {
      title: "GG.deals: Game deals",
      description: "GG.deals: Game deals",
      url: "https://gg.deals",
      keywords:"game deals, games for cheap, cheap games, deals on games, deals for games",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://gg.deals",
    },
                                                                                {
      title: "Apple Safari",
      description: "Safari is the best way to experience the internet on all your Apple devices. It brings robust customization options, powerful privacy protections, and optimizes battery life — so you can browse how you like, when you like.",
      url: "https://www.apple.com/safari/",
      keywords:"apple safari, safari browser",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/2057px-Safari_browser_logo.svg.png",
    },
                                                                            {
      title: "Unity",
      description: "Create and grow real-time 3D games, apps, and experiences for entertainment, film, automotive, architecture, and more. Get started with Unity today.",
      url: "https://unity.com",
      keywords:"unity, game engine",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://unity.com",
      subpages: ": /download",
    },
                                                                        {
      title: "Paramount: Home",
      description: "A legendary producer and global distributor of filmed entertainment since 1912, Paramount Pictures' library consists of more than 1,000 film titles.",
      url: "https://www.paramount.com",
      keywords:"paramount, live tv",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.paramount.com",
    },
                                                                    {
      title: "Paramount+",
      description: "Stream thousands of episodes, live sports & exclusive originals – all in one place. Access hundreds of iconic movies, from award-winning classics to hit releases. Hit CBS shows.",
      url: "https://www.paramountplus.com",
      keywords:"paramount, online streaming, tv streaming, paramount+, paramount plus",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.paramountplus.com",
    },
                                                                {
      title: "Oculus",
      description: "Games, Fitness, Entertainment — The library keeps growing. Dive into the expansive app and game library on Meta Quest 3. Discover Meta’s revolutionary technology from virtual reality to social experiences.",
      url: "https://www.oculus.com",
      keywords:"vr headset, virual reality, virtual-reality, oculus",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.oculus.com",
    },
                                                            {
      title: "Epic",
      description: "Get Epic to explore 40K+ kids' books online, from classic storybooks to audiobooks, comics & more.",
      url: "https://www.getepic.com",
      keywords:"kid's books, kids books, kids' books, children's books, childrens' books, epic, books, teaching, school, e-books",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.getepic.com",
    },
                                                        {
      title: "Lucasfilm Ltd.",
      description: "Founded in 1971, Lucasfilm is one of the world's leading entertainment companies and home to the legendary Star Wars and Indiana Jones franchises.",
      url: "https://www.lucasfilm.com",
      keywords:"lucas film, lucasfilm",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.lucasfilm.com",
    },
                                                    {
      title: "Wiktionary",
      description: "Wiktionary Free dictionary · 1,000,000+ entries",
      url: "https://www.wiktionary.org",
      keywords:"dictionary, wiktionary",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.wiktionary.com",
    },
                                                {
      title: "RetroArch",
      description: "RetroArch is a frontend for emulators, game engines and media players.",
      url: "https://www.retroarch.com",
      keywords:"emulators, emulator",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwEM3k5v7pQVOHO1kmfXfCFMAHqNdNp_aLQ&s",
    },
                                            {
      title: "Gatorade",
      description: "Shop the Gatorade Official Site for sports drinks, protein powder & bars, custom sports gear, bottles & more!",
      url: "https://www.gatorade.com",
      keywords:"sports drink, protein bars, gatorade",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.gatorade.com",
    },
                                        {
      title: "Opera GX",
      description: "Get unparalleled gaming and browsing features, packed in a powerful revolutionary browser. Top Browsing Experience. Access 1000s of extensions. Make your own Browser. Get it now! Download Now.",
      url: "https://www.opera.com/gx/",
      keywords:"browser, browsers, opera gx",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.opera.com/gx",
    },
                                    {
      title: "Opera",
      description: "Download the new Opera browser — Customize Opera With Dark and Light Themes, Wallpapers, Bookmarks & Tons Of Other Options. Join Millions of Opera Users for Personalized & Safer Web Experience! Download Opera Today. Free. Fast. New. Update now. Safe. Speed. Personal Browser. Free VPN.",
      url: "https://www.opera.com/",
      keywords:"opera browser, browser, browsers, opera",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.opera.com",
    },
                                {
      title: "Omen",
      description: "OMEN is a gaming brand by HP...",
      url: "https://www.omen.com/",
      keywords:"gaming laptops, gaming desktops, gaming pcs, omen, gaming hub, hp gaming, hp laptops",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.omen.com",
    },
                            {
      title: "Intel",
      description: "People are driving global change using Intel tech to shape the future. Learn more today. Putting sustainability at the heart of their business to create a sustainable future. World-changing technology. Propel your business. Fearless innovation. Radical innovation.",
      url: "https://www.intel.com/",
      keywords:"intel, cpu, cpus",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.intel.com",
    },
                        {
      title: "Yelp",
      description: "User Reviews and Recommendations of Best Restaurants, Shopping, Nightlife, Food, Entertainment, Things to Do, Services and More at Yelp.",
      url: "https://www.yelp.com/",
      keywords:"reviews, review websites, review webpages, online reviews",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.yelp.com",
    },
                    {
      title: "Energizer",
      description: "Energizer Holdings, Inc. is an American manufacturer and one of the world's largest manufacturers of batteries, headquartered in St. Louis, Missouri. It produces batteries under the Energizer, Ray-O-Vac, Varta, and Eveready brand names and formerly owned several personal care businesses until it separated that side of the business into a new company called Edgewell Personal Care in 2015.",
      url: "https://energizer.com/",
      keywords:"batteries, battery, energizer",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://energizer.com",
    },
                        {
      title: "Duracell",
      description: "Explore AA batteries, rechargeable batteries, chargers, coin button batteries and more from Duracell, the longer-lasting and #1 trusted battery brand.",
      url: "https://www.duracell.com/",
      keywords:"batteries, battery, duracell",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://duracell.com",
    },
                                        {
      title: "Mozilla",
        description: "We’re not a normal tech company. The things we create prioritize people and their privacy over profits. We exist to make the internet a healthier, happier place for everyone.",
      url: "https://www.mozilla.org/",
      keywords:
        "mozilla",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.mozilla.org/",
    },
                                                                                             {
      title: "OBS Studio",
        description: "OBS (Open Broadcaster Software) is free and open source software for video recording and live streaming.",
      url: "https://obsproject.com",
      keywords:
        "obs studio, obs-studio, livestream software, live-stream software, live stream software, recording software, recording-software",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.obsproject.com",
    },
    {
      title: "Hershey's",
        description: "Welcome to Hersheyland, your go-to dessert destination for tasty recipes, celebration ideas and family activities. Find a special treat to bake with your kiddos. Plan an awesome party. Re-discover your favorite Hershey brands. Hersheyland is full of ways to make life a little sweeter!",
      url: "https://www.hersheyland.com/",
      keywords:
        "candy bar, candy, candy-bar, chocolate, hersheys, hershey, hershey's, hershey land, hersheyland, hershey-land",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.hersheyland.com/",
    },
                                                                            {
      title: "Virtual Box",
        description: "Not only is VirtualBox an extremely feature rich, high performance product for enterprise customers, it is also the only professional solution that is freely available as Open Source Software under the terms of the GNU General Public License (GPL) version 3.",
      url: "https://www.virtualbox.org",
      keywords:
        "virtual-box, virtual box, virtualbox, virtual-machine, virtual machine",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.virtualbox.org",
    },
                                                                    {
      title: "Disney Plus",
        description: "Disney+ is a streaming service where you can watch unlimited movies, TV series, and Originals. Sign-up with plans starting at $7.99 per month.",
      url: "https://www.disneyplus.com",
      keywords:
        "streaming services, streaming service, online streaming, disney+, disney-plus, disney plus, disneyplus, disney-+, disney +",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.disneyplus.com",
    },
                                                                {
      title: "UPS",
        description: "Need to ship packages across the world? Let UPS be your logistics partner. Explore our services and simplify your shipping process.",
      url: "https://www.ups.com",
      keywords:
        "global shipping",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.ups.com",
    },
                                                            {
      title: "Dolphin Emulator",
        description: "Official website of Dolphin, the GameCube and Wii emulator. Download the latest version (5.0-21606) now or ask questions on our forums for help.",
      url: "https://dolphin-emu.org",
      keywords:
        "gamecube emulator, game cube emulator, game-cube emulator, wii emulator",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://dolphin-emu.org",
    },
                                                        {
      title: "Ring",
        description: "Official Ring Security Store — See Who’s There With Ring. Answer the Door and Check In on Home at Anytime From Anywhere. Tell Porch Snoopers to Get Lost in Real-Time, From Your Phone w/ Live View.",
      url: "https://www.ring.com",
      keywords:
        "doorbell, ring, door-bell, door bell",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.ring.com",
    },
                                                    {
      title: "Dove",
        description: "The Home Of Real Beauty — Embrace The Best Version Of Yourself & Fulfill Your Beauty Potential Today with Dove. Explore The World Of Dove & Fulfill Your Beauty Potential With Nourishing Products.",
      url: "https://www.dove.com",
      keywords:
        "skincare, skin care, skin-care, lotion",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.dove.com",
    },
                                                {
      title: "Firefox",
        description: "Firefox Browsers · Get the browser that puts your privacy first — and always has · Desktop · Mobile · Enterprise · One login. Everything Mozilla.",
      url: "https://www.mozilla.org/firefox/",
      keywords:
        "firefox, mozilla",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.mozilla.org/firefox/",
    },
                                    {
      title: "SQLite",
        description: "SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.",
      url: "https://www.sqlite.org/",
      keywords:
        "sqlite, sq-lite, database, data base, data-base",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.sqlite.org/",
    },
                                        {
      title: "Node.js",
        description: "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      url: "https://nodejs.org",
      keywords:
        "node js, node.js, javascript runtime",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://nodejs.org/",
    },
                                {
      title: "Fastly",
        description: "Fastly for streaming media and entertainment. Fastly gives every viewer around the world a better experience on our modern network.",
      url: "https://www.fastly.com",
      keywords:
        "fastly",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.fastly.com",
    },
                            {
      title: "Olay",
        description: "Formulated with effective ingredients · Vitamin C. An antioxidant that fights surface free radicals that can lead to uneven texture, tone, and hyperpigmentation.",
      url: "https://www.olay.com",
      keywords:
        "skincare, skin care, skin-care, olay",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.olay.com",
    },
                        {
      title: "Stylish",
        description: "Stylish is the #1 choice for free website themes that lets you customize any website. Choose your website skins today from our gallery and get Styling!",
      url: "https://userstyles.org",
      keywords:
        "stylish, custom css, change webpage css",
      icon: "https://lh3.googleusercontent.com/9DqxDItZ8uhKzrYoWL4nDqoIl60Tj7XIBoIrW04dk8sVORo-zFbuCr6cGo6Vthn7ViXKq-pqeWnS4brn8pgGp4Pr=s60",
    },
                                {
      title: "Stylish",
        description: "Create and share awesome custom themes and styles for any website of your choice. With the Stylish extension you can create unique and personalized themes for...",
      url: "https://chromewebstore.google.com/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe",
      keywords:
        "stylish, custom css, change webpage css",
      icon: "https://fonts.gstatic.com/s/i/productlogos/chrome_store/v7/192px.svg",
      domainName: "Chrome Web Store",
    },
                    {
      title: "Blu-Ray",
        description: "Everything about Blu-ray Disc. Blu-ray reviews, releases, news, guides and forums covering Blu-ray movies, players, recorders, drives, media, software and more.",
      url: "https://www.blu-ray.com",
      keywords:
        "blu-ray, blu ray",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.blu-ray.com",
    },
                {
      title: "Quick-Edit",
        description: "A JS and HTML editor built by TurtleWave. Load your projects with the click of a button and share with your friends!",
      url: "https://quick-edit.glitch.me",
      keywords:
        "code editor, js editor, javascript editor, html editor, website maker, webpage maker, quick edit",
      icon: "https://cdn.glitch.global/3afdaf0d-afda-492b-ab3c-83ea20edbdd7/Untitled.png?v=1716687769374",
      subpages: ": /examples.html",
    },
            {
      title: "Cars.com",
      description: "Official Cars.com Site — Inspire Your Next Journey With the Perfect Car. Choose From 2M+ Listings and Hit the Road.",
      url: "https://www.cars.com",
      keywords:
        "cars.com, cars, car dealerships, buy cars, cheap cars, car shop, cars shop",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.cars.com",
      subpages: ": /shopping/",
    },    
                {
      title: "Blooket",
      description: "Blooket is an exciting new take on the modern classroom review game. It aims to match action with education to create the ultimate learning experience!",
      url: "https://www.blooket.com",
      keywords:
        "education games, learning games",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.blooket.com",
      subpages: ": /play",
    },
                        {
      title: "THX",
      description: "The entertainment experience you want wherever you want it · Featured Headlines · THX Spatial Creator empowers content creators with 3D immersive audio.",
      url: "https://www.thx.com",
      keywords:
        "thx, george lucas",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.thx.com",
    },
                    {
      title: "WineBottler",
      description: "WineBottler packages Windows-based programs snugly into OS X app-bundles. No need to install emulators or operating systems!",
      url: "https://winebottler.kronenberg.org/",
      keywords:
        "windows on mac, windows apps on mac, window games on mac",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://winebottler.kronenberg.org",
    },
                        {
      title: "Algodoo",
      description: "Algodoo gives you the opportunity to play with physics. Use your own hands and simple drawing tools to design, construct and explore the world of physics.",
      url: "https://www.algodoo.com",
      keywords:
        "physics engine, 2d physics",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.algodoo.com",
    },
                                        {
      title: "Bitcoin - Open source P2P money",
      description: "Bitcoin is an innovative payment network and a new kind of money. Find all you need to know and get started with Bitcoin on bitcoin.org.",
      url: "https://bitcoin.org",
      keywords:
        "bitcoin, bitcoin wallet, crypto currency",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://bitcoin.org",
    },
                            {
      title: "MetaMask",
      description: "MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and web3. Trusted by millions of users worldwide.",
      url: "https://metamask.io",
      keywords:
        "crypto wallet, crypto currency, crypto currency wallet, bitcoin",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://metamask.io",
    },
                                {
      title: "Bitcoin.com",
      description: "The world's gateway to Bitcoin & cryptocurrency. Buy, sell, spend, swap, and invest in BTC, ETH, BCH, AVAX, MATIC & hundreds more digital assets.",
      url: "https://www.bitcoin.com",
      keywords:
        "bitcoin, bitcoin wallet, crypto currency",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.bitcoin.com",
    },
                        {
      title: "How to run Windows games on Mac",
      description: "Summary: You can use Mac OS and windows os in one pc with bootcamp, and if you want windows keys, you can order from Microsoft partner Hypest-key",
      url: "https://www.reddit.com/r/macgaming/comments/14vnf3k/best_way_to_play_windows_games_on_macos/",
      keywords:
        "windows on mac, windows apps on mac, window games on mac",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://reddit.com",
      domainName: "Reddit",
    },
                    {
      title: "Scholastic",
      description: "Supporting Parents & Educators — Scholastic Provides Books, Literary Resources, and Education Solutions. Helping Parents and Teachers for Over 100 Years. Everything You Need in One Place. Fun and Educational.",
      url: "https://www.scholastic.com",
      keywords:
        "education, teaching, schools, scholastic, magazines",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.scholastic.com",
    },
                    {
      title: "Kahoot",
      description: "Kahoot! is a game-based learning platform that brings engagement and fun to 1+ billion players every year at school, at work, and at home.",
      url: "https://kahoot.com",
      keywords:
        "quiz games, kahoot.it, kahoot it, kahoot",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://kahoot.com",
    },
                    {
      title: "Toyota",
      description: "Explore the newest Toyota trucks, cars, SUVs, hybrids and minivans. See photos, compare models, get tips, calculate payments, and more.",
      url: "https://www.cars.com",
      keywords:
        "toyota, toyota cars, cars",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.toyota.com",
    },
                        {
      title: "BMW.com",
      description: "Drive Into A Better Future. Feel The Pure Rush Of Powerful Performance With Electric Motors Designed And Built By BMW. Experience An Extraordinary Feeling Unlike Any Other In Your BMW All-Electric Vehicle.",
      url: "https://www.bmw.com",
      keywords:
        "bmw, bmw cars, cars, electric cars",
      icon: "https://www.bmw.com/favicon.ico",
    },
                        {
      title: "Jeep® Official Site",
      description: "Our Dealers Are Highly Qualified To Help You. Visit Today And Drive Home Your Jeep® SUV. Adventure Ready. Online Shopping Available.",
      url: "https://www.jeep.com",
      keywords:
        "jeep, jeep cars, cars",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.jeep.com",
    },
                            {
      title: "Dodge Official Site",
      description: "Domestic. Not Domesticated. Dodge vehicles are bred for performance. Explore the full Dodge lineup, inventory, incentives, dealership information & more.",
      url: "https://www.dodge.com",
      keywords:
        "dodge, dodge cars, cars, sport cars, sport car",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.dodge.com",
    },
        {
      title: "Minecraft",
      description: "A 3D sandbox game where you can build and survive.",
      url: "https://www.minecraft.net",
      keywords:
        "minecraft, online sandbox games, minecraft online sandbox",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=minecraft.net",
    },
    {
      title: "Minecraft Classic",
      description: "Play the classic version of Minecraft right in your browser!",
      url: "https://classic.minecraft.net",
      keywords: "classic minecraft, minecraft",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.minecraft.net",
    },
                                    {
      title: "GlobalData",
      description: "GlobalData provides unique data, expert analysis & innovative solutions to companies in the world's largest industries.",
      url: "https://www.globaldata.com",
      keywords: "llc., inc., globaldata, industries",
      icon: "https://www.globaldata.com/wp-content/uploads/2021/10/favicon.ico",
      subpages: ": /companies/",
    },
                                {
      title: "Epic Games",
      description: "We develop cutting-edge games and cross-platform game engine technology!",
      url: "https://www.epicgames.com",
      keywords: "epicgames, epic games, unreal engine, unrealengine",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.epicgames.com",
      subpages: ": /login, /store",
    },
                            {
      title: "Twitch",
      description: "Twitch is an interactive livestreaming service for content spanning gaming, entertainment, sports, music, and more.",
      url: "https://www.twitch.tv",
      keywords: "twitch, twitch.tv, live streams, live streaming, twitch tv",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=www.twitch.tv",
      subpages: ": /login, /signup",
    },
                        {
      title: "Sea Turtles",
      description: "Sea turtles (superfamily Chelonioidea), sometimes called marine turtles, are reptiles of the order Testudines and of the suborder Cryptodira.",
      url: "https://en.wikipedia.org/wiki/Sea_turtle",
      keywords: "turtle, turtles, slider turtle, slider turtles",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
      domainName: "Wikipedia",
    },
                                {
      title: "Western United States",
      description: "The Western United States, also called the American West, the Western States, the Far West, and the West, is the region comprising the westernmost U.S. states.",
      url: "https://en.wikipedia.org/wiki/Western_United_States",
      keywords: "west region, regions, western",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
      domainName: "Wikipedia",
    },
                                    {
      title: "Southeastern United States",
      description: "The Southeastern United States, also referred to as the American Southeast, the Southeast, or the South, is a geographical region of the United States located in the eastern portion of the Southern United States and the southern portion of the Eastern United States.",
      url: "https://en.wikipedia.org/wiki/Southeastern_United_States",
      keywords: "southeast region, regions, southeastern",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
      domainName: "Wikipedia",
    },
                                        {
      title: "Northeastern United States",
      description: "The Northeastern United States, also referred to as the Northeast, the East Coast, or the American Northeast, is a geographic region of the United States located on the Atlantic coast of North America.",
      url: "https://en.wikipedia.org/wiki/Northeastern_United_States",
      keywords: "northeast region, regions, northeastern",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
      domainName: "Wikipedia",
    },
                                {
      title: "Midwestern United States",
      description: "The Midwestern United States, also referred to as the Midwest or the American Midwest, is one of four census regions of the United States Census Bureau.",
      url: "https://en.wikipedia.org/wiki/Midwestern_United_States",
      keywords: "midwest region, regions, midwestern",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
      domainName: "Wikipedia",
    },
                                    {
      title: "Southwestern United States",
      description: "The Southwestern United States, also known as the American Southwest or simply the Southwest, is a geographic and cultural region of the United States that includes Arizona and New Mexico, along with adjacent portions of California, Colorado, Nevada, Oklahoma, Texas, and Utah.",
      url: "https://en.wikipedia.org/wiki/Southwestern_United_States",
      keywords: "southwest region, regions, southwestern",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
      domainName: "Wikipedia",
    },
                {
      title: "Turtles",
      description: "Turtles, or testudines, are reptiles of the order Testudines, characterized by a special shell developed mainly from their ribs.",
      url: "https://en.wikipedia.org/wiki/Turtle",
      keywords: "turtle, turtles",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
      domainName: "Wikipedia",
    },
            {
      title: "Ollama",
      description: "Get up and running with large language models. Run Llama 3, Phi 3, Mistral, Gemma, and other models. Customize and create your own.",
      url: "https://ollama.ai",
      keywords: "ollama, ai, ai models, llama",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=ollama.ai",
      subpages: ": /settings, /download",
    },
            {
      title: "YouTube Music",
      description: "A new music service with official albums, singles, videos, remixes, live performances and more for Android, iOS and desktop. It's all here.",
      url: "https://music.youtube.com/",
      keywords: "youtube music, spotify, music player",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=music.youtube.com",
      subpages: ": /music_premium, /explore"
    },
        {
      title: "TurtleWave Search",
      description: "Search the web in the best way possible. Use TurtleWave Search along with easter eggs, images, and sounds. Also the only way to use TurtleWave's Summary feature.",
      url: "https://turtlewave.netlify.app",
      keywords: "search engine, turtlewave search, turtlewave browser, turtlewave",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=turtlewave.netlify.app",
      subpages: ": /account/, /settings, /install.html, /contact-us/",
    },
        {
      title: "YouTube",
      description: "Share your videos with friends, family, and the world.",
      url: "https://youtube.com/",
      keywords: "youtube, youtube shorts, video sharing, video, social media",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com",
      subpages: ": /account, /premium, /@YouTube",
    },
                                   {
      title: "YouTube Studio",
      description:
        "YouTube Studio is the home for creators. You can manage your presence, grow your channel, interact with your audience, and make money all in one place.",
      url: "https://studio.youtube.com/",
      keywords: "youtube studio, studio.youtube, youtube editor",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com"
    },
                                                                                    {
      title: "GIPHY",
      description:
        "GIPHY is the platform that animates your world. Find the GIFs, Clips, and Stickers that make your conversations more positive, more expressive, and more.",
      url: "https://giphy.com/",
      keywords: "gifs, gif, giphy",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://giphy.com",
    },
                                                                                {
      title: "The Useless Web",
      description:
        "The Useless Web Button... take me somewhere... useless. The perfect button for the bored, or those looking to find random sites online!",
      url: "https://theuselessweb.com/",
      keywords: "useless websites, the useless web, websites with no use, the most useless website",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=http://theuselessweb.com",
    },
                                                                                            {
      title: "Endless Horse",
      description:
        "An ASCII art representation of a horse that perpetually generates more legs as you scroll down.",
      url: "http://endless.horse/",
      keywords: "endless horse, endless.horse",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://endless.horse",
    },
                                                                                    {
      title: "The Pug In A Rug",
      description:
        "Watch the Pug be in the Rug. Level up and maximize!",
      url: "https://puginarug.com/",
      keywords: "pug in a rug, pug in rug, pugs",
      icon: "https://puginarug.com/assets/pug.png",
    },
                                                                    {
        title: "Allrecipes",
      description:
        "Everyday recipes with ratings and reviews by home cooks like you. Find easy dinner ideas, healthy recipes, plus helpful cooking tips and techniques.",
      url: "https://www.allrecipes.com",
      keywords: "recipe, recipes, how to make, how to cook, how to bake",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.allrecipes.com",
    },
                                                                {
        title: "Search [q] on TurtleWave Classic",
      description:
        "Search TurtleWave Classic for your search query",
      url: "&searchOnLink=twClassic",
      keywords: "on turtlewave classic, turtlewave classic, tw classic, turtlewave classic search",
      icon: "",
      engine: "TurtleWave Classic",
    },
                                                            {
        title: "Search [q] on TurtleWave Updates",
      description:
        "Search TurtleWave Updates for your search query",
      url: "&searchOnLink=twUpdates",
      keywords: "on turtlewave updates, turtlewave updates, tw updates, turtlewave updates search",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=",
      engine: "TurtleWave Updates",
    },
                                                        {
        title: "Show results for [Q] on Google Play",
      description:
        "Search Google Play for your search query",
      url: "&searchOnLink=playgoogle",
      keywords: "on google play, google play",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=play.google.com",
      engine: "Google Play",
    },
                                                    {
      title: "NVIDIA",
      description:
        "NVIDIA invents the GPU and drives advances in AI, HPC, gaming, creative design, autonomous vehicles, and robotics.",
      url: "https://www.nvidia.com",
      keywords: "nvidia",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nvidia.com",
    },
                                                {
      title: "Little Alchemy 2",
      description:
        "Mix items and create the world from scratch!",
      url: "https://littlealchemy2.com/",
      keywords: "little alchemy, littlealchemy",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=littlealchemy2.com",
    },
                                            {
      title: "Teenage Mutant Ninja Turtles Fan Site",
      description:
        "There is no shortage of Teenage Mutant Ninja Turtles collectibles out there. With even with Mezco 5 Points TMNT Set. by Kyle Tobey.",
      url: "https://www.teenagemutantninjaturtles.com/",
      keywords: "tmnt, teenage mutant ninja turtles, t.m.n.t., t.m.n.t",
      icon: "https://www.teenagemutantninjaturtles.com/favicon.ico",
    },
                                        {
      title: "15 Things That Pose a Threat To Hedgehogs",
      description:
        "The hedgehog population has continually declined throughout the years: from about 30 million in the 1950s to 1.5 million in the 1990s, down to less than 1 million today...",
      url: "https://hedgehogcare101.com/15-things-that-pose-a-threat-to-hedgehogs-keep-them-away/",
      keywords: "hedgehog care, hedgehog guide, hedgehog guide for care, hedgehog, threats to hedgehogs",
      icon: "https://hedgehogcare101.com/wp-content/uploads/2013/11/cropped-cropped-hedgehog-care-logo-32x32.png",
    },
                                    {
      title: "Hedgehog Care 101",
      description:
        "Hedgehog FAQs. Hedgehog Care 101 was created to serve as the most complete, easy-to-navigate, one-stop resource for all things hedgehog!",
      url: "https://hedgehogcare101.com/",
      keywords: "hedgehog care, hedgehog guide, hedgehog guide for care, hedgehog",
      icon: "https://hedgehogcare101.com/wp-content/uploads/2013/11/cropped-cropped-hedgehog-care-logo-32x32.png",
    },
                                {
      title: "Average Hedgehog Lifespan",
      description:
        "Dr. Keller says, “With appropriate care and keeping, your hedgehog will live about five years, and some even live longer than eight years.” If you have any questions about hedgehogs, contact your local veterinarian.",
      url: "https://vetmed.illinois.edu/pet-health-columns/hedgehog-pets/",
      keywords: "hedgehog age, hedgehog lifespan, hedgehog",
      icon: "https://vetmed.illinois.edu/favicon.ico",
    },
                            {
      title: "Southwest region, United States",
      description:
        "Information about the Southwest region.",
      url: "https://turtwave.netlify.app/apps/turtlewave/EN/regionsLearn/southwest.html",
      keywords: "south west, southwest, usa regions",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1747959967/NewLogoBig_qasvxi.png",
    },
                        {
      title: "Midwest region, United States",
      description:
        "Information about the Midwest region.",
      url: "https://turtwave.netlify.app/apps/turtlewave/EN/regionsLearn/midwest.html",
      keywords: "mid west, midwest, usa regions",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1747959967/NewLogoBig_qasvxi.png",
    },
                    {
      title: "West region, United States",
      description:
        "Information about the West region.",
      url: "https://turtwave.netlify.app/apps/turtlewave/EN/regionsLearn/west.html",
      keywords: "west, usa regions",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1747959967/NewLogoBig_qasvxi.png",
    },
                {
      title: "Northeast region, United States",
      description:
        "Information about the Northeast region.",
      url: "https://turtwave.netlify.app/apps/turtlewave/EN/regionsLearn/northeast.html",
      keywords: "northeast, north east, usa regions",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1747959967/NewLogoBig_qasvxi.png",
    },
            {
      title: "Southeast region, United States",
      description:
        "Information about the Southeast region.",
      url: "https://turtwave.netlify.app/apps/turtlewave/EN/regionsLearn/southeast.html",
      keywords: "southeast, south east, usa regions",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1747959967/NewLogoBig_qasvxi.png",
    },
                {
      title: "Google Translate",
      description:
        "Google's service, offered free of charge, instantly translates words, phrases, and web pages between English and over 100 other languages.",
      url: "https://translate.google.com",
      keywords: "google translate, !App=Google, translator, translate",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=translate.google.com",
    },
                {
      title: "Google Domains",
      description:
        "Quickly search domain names for your next big idea!",
      url: "https://domains.google",
      keywords: "google, domains, !App=Google",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=domains.google",
    },
                                                    {
      title: "Google Labs",
      description:
        "Labs.Google is Google's home for the latest AI tools, technology and discourse.",
      url: "https://labs.google",
      keywords: "!app=google, google labs",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=labs.google",
    },
                                                {
      title: "WeTransfer",
      description:
        "WeTransfer is the simplest way to send your files around the world. Share large files and photos. Transfer up to 2GB free. File sharing made easy!",
      url: "https://wetransfer.com" ,
      keywords: "storage drive, tranfer files, file sharing, fire uploading, file sharer, file uploader, share files online, share file online, wetransfer.com",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://wetransfer.com",
    },
                                            {
      title: "101 Useful Websites",
      description:
        "The most useful websites on the Internet that will make you smarter, increase productivity and help you learn new skills",
      url: "https://www.labnol.org/internet/101-useful-websites/18078/" ,
      keywords: "useful websites",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://labnol.org/internet/",
    },
                                        {
      title: "OceanHero Minigames",
      description:
        "Using advertisements, you can help save the oceans and many animals inside of them by playing games!",
      url: "https://oceanhero.today/games" ,
      keywords: "oceanhero, save the turtles, save turtles, save the oceans",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://oceanhero.today",
    },
                                    {
      title: "AnonymSMS",
      description:
        "AnonymSMS is a totally free online service whereby you can receive SMS messages online, without the need of inputting your own mobile/cell phone number.",
      url: "https://anonymsms.com/" ,
      keywords: "disposable phone number, limited time phone number, rent a phone number, rentable phone number, 10 minute phone number, SMS, cell number, phone number",
      icon: "https://anonymsms.com/favicon.ico",
    },
                                {
      title: "Dominos",
      description:
        "Order Online — Domino’s® Rewards Is Much More Than Free Pizza! Place an Order To Start Earning Today. Domino’s® Pizza: It’s Delicious, It’s Customizable, and It Brings People Together.",
      url: "https://www.dominos.com" ,
      keywords: "dominos, pizza, domino's",
      icon: "https://www.dominos.com/favicon.ico",
    },
                            {
      title: "Pizzahut",
      description:
        "Discover Classic & New Menu Items, and Enjoy Seamless Ordering For Delivery and Carryout. Order Online to Get Your Favorite Pizza at a Price You Love from a Pizza Hut®...",
      url: "https://www.pizzahut.com" ,
      keywords: "pizza hut, pizzahut",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.pizzahut.com",
    },
                        {
      title: "Uber",
      description:
        "A Ride When You Need It — Share Your Trip Status With Loved Ones. Call 911 In The App In Case Of An Emergency. Upfront Pricing On Every Trip So You Have An Idea Of What You'll Pay. Schedule a Ride.",
      url: "https://www.uber.com" ,
      keywords: "uber, taxi, pickup, pick up, car pickup, car pick up",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.uber.com",
    },
                    {
      title: "Uber Eats",
      description:
        "Find the best restaurants that deliver. Get contactless delivery for restaurant takeout, groceries, and more! Order food online or in the Uber Eats app and...",
      url: "https://www.ubereats.com" ,
      keywords: "uber eats, delivery, restraunts, ubereats",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.ubereats.com",
    },
                        {
      title: "Doordash",
      description:
        "We have local teams dedicated to finding delicious food & great restaurants in your city. Get your favorite meal at your door in minutes. enjoy DoorDash's fast delivery service.",
      url: "https://www.doordash.com",
      keywords: "doordash, delivery, restraunts, door dash",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.doordash.com",
    },
                {
      title: "GrubHub",
      description:
        "Grubhub Delivers Your Favorite Restaurants, Grocery Stores, Pharmacies, and More",
      url: "https://www.grubhub.com" ,
      keywords: "grubhub, delivery, restraunts",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.grubhub.com",
    },
            {
      title: "Red Robin",
      description:
        "New Menu Items & Upgrades — Burgers to suit every taste and preference. Adverturous & picky eaters unite at Red Robin®. Taste The Difference And Alleviate Cravings With Burgers & Bottomless Items Like Fries.",
      url: "https://www.redrobin.com" ,
      keywords:
        "red robin, restraunts, burgers, bottomless fries",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.redrobin.com",
    },
        {
      title: "Friendly's",
      description:
        "Friendly's has been a favorite family restaurant over 80 years! From ice cream to burgers, bring your family to dine at a local Friendly's today!",
      url: "https://www.friendlysrestaurants.com/" ,
      keywords:
        "friendlys, friendly's, diners, restraunts, icecream, ice cream",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.friendlysrestaurants.com",
    },
            {
      title: "Domains",
      description:
        "A domain from Squarespace comes with security and privacy included. No hidden fees.",
      url: "https://domains.squarespace.com" ,
      keywords:
        "squarespace.com, squarespace, domains, website maker, make websites, free websites",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://domains.squarespace.com",
         domainName: "Squarespace",
    },
            {
      title: "GoDaddy | Domains, Websites & More",
      description:
        "Create a customizable website or online store with an all-in-one solution from Squarespace. Choose a website template and start your free trial today.",
      url: "https://godaddy.com" ,
      keywords:
        "godaddy.com, godaddy, website maker, make websites, free websites, domains",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://godaddy.com",
            subpages: ": /domains",
    },
        {
      title: "Squarespace",
      description:
        "Create a customizable website or online store with an all-in-one solution from Squarespace. Choose a website template and start your free trial today.",
      url: "https://squarespace.com" ,
      keywords:
        "squarespace.com, squarespace, website maker, make websites, free websites",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://squarespace.com",
            subpages: ": /login, /pricing, /domains",
    },
    {
      title: "Glitch",
      description:
        "Glitch is the friendly place where everyone builds the web. Start a new blog, play with React, or build new worlds with WebXR.",
      url: "https://glitch.com" ,
      keywords:
        "glitch.com, glitch.me, domains, website maker, make websites",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://glitch.com",
            subpages: ": /dashboard, /discover, /help",
    },
        {
      title: "Glitch: Preview",
      description:
        "Glitch preview is where you can see what is coming to Glitch.com and see what features are in testing.",
      url: "https://preview.glitch.com" ,
      keywords:
        "glitch.com, glitch.me, glitch preview, preview.glitch.com, preview.glitch.me",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://preview.glitch.com",
            subpages: ": /dashboard, /discover, /help",
    },
                                                                    {
      title: "Google Images",
      description:
        "Google Images. The most comprehensive image search on the web.",
      url: "https://images.google.com" ,
      keywords:
        "images, png, google, !app=google",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://images.google.com",
    },
                                                                {
      title: "Google Search Console",
      description:
        "Search Console tools and reports help you measure your site's Search traffic and performance, fix issues, and make your site shine in Google Search results",
      url: "https://search.google.com/search-console",
      keywords:
        "search console, google, !app=google",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://search.google.com/search-console",
    },
                                                            {
      title: "Beepbox.co",
      description:
        "BeepBox is an online tool for sketching and sharing instrumental music. Make sure that your volume is turned up, then press the play button!",
      url: "https://beepbox.co/",
      keywords:
        "beepbox.co, music",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://beepbox.co",
    },
                                                        {
      title: "Soundtrap",
      description:
        "Your everywhere studio. Create and record easily with powerful tools and sounds, all in one place.",
      url: "https://soundtrap.com/",
      keywords:
        "soundtrap, music",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://soundtrap.com",
    },
                                                    {
      title: "News",
      description:
        "See what's happening around the world",
      url: "https://news.com/",
      keywords:
        "news, trending",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://news.com",
    },
                                                {
      title: "GitHub",
      description:
        "GitHub is where over 100 million developers shape the future of software, together",
      url: "https://github.com",
      keywords:
        "github, source",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://github.com",
    },
                                    {
      title: "TurtleWave for Android (app)",
      description:
        "TurtleWave APK file for Android.",
      url: "https://turtlewave-updates.glitch.me/instructions/android.html",
      keywords:
        "turtlewave android app, turtlewave, !InstallTW=Android",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=",
    },
                                    {
      title: "Google Drive",
      description:
        "Drive can provide encrypted and secure access to your files. Files shared with you can be proactively scanned and removed when malware, spam, ransomware, or phishing is detected.",
      url: "https://drive.google.com",
      keywords:
        "google drive, !App=Google",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://drive.google.com",
    },
                                {
      title: "Google Chrome",
      description:
        "Chrome is the official web browser from Google, built to be fast, secure, and customizable. Download now and make it yours.",
      url: "https://www.google.com/chrome/",
      keywords:
        "chrome, google, !App=Google",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://google.com/chrome/",
    },
                            {
      title: "TurtleWave Account Creator",
      description:
        "Create an account for all things TurtleWave",
      url: "/account/create.html",
      keywords:
        "account",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=",
    },
                        {
      title: "Chrome Web Store",
      description:
        "Welcome to the Chrome Web Store. Supercharge your browser with extensions and themes for Chrome.",
      url: "https://chromewebstore.google.com/",
      keywords:
        "chrome, extensions",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://chromewebstore.google.com",
    },
                    {
      title: "Capcut",
      description:
        "CapCut is an all-in-one creative platform powered by AI that enables video editing and image design on browsers, Windows, Mac, Android, and iOS.",
      url: "https://capcut.com",
      keywords:
        "capcut, video editor",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://capcut.com",
    },
                {
      title: "Invideo.io",
      description:
        "Create video by typing simple text prompts, just like you would ask a human editor. Generate videos with powerful visuals, voices, and text using just one AI tool. 24x7 Support.",
      url: "https://invideo.io",
      keywords:
        "invideo.io",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://invideo.io",
    },
            {
      title: "Basic Calculator",
      description:
        "A basic calculator",
      url: "https://turtwave.netlify.app/basic-calculator/",
      keywords:
        "math, calculator",
      icon: "",
    },
        {
      title: "What is a cat?",
      description:
        "1. An animal of the family Felidae 2. A domesticated subspecies (Felis silvestris catus) of feline animal, commonly kept as a house pet.",
      url: "",
      keywords:
        "cats, what is a cat, what is, cat, popular animals, i like cats, info about cats, information about cats, !animal.cat",
      icon: "",
    },
                                {
      title: "National Geographic",
      description:
        "Explore National Geographic. A world leader in geography, cartography and exploration.",
      url: "https://www.nationalgeographic.com/",
      keywords: "natural geographic",
      icon: "https://www.nationalgeographic.com/favicon.ico",
    },
                {
      title: "National Geographic | Domestic cat",
      description:
        "As mostly nocturnal animals, cats have excellent vision and hearing, with ears that can turn like satellite dishes. Their reputation for having nine lives stems ...",
      url: "https://www.nationalgeographic.com/animals/mammals/facts/domestic-cat",
      keywords: "domestic cat",
      icon: "https://www.nationalgeographic.com/favicon.ico",
    },
                    {
      title: "National Geographic | Domestic dog",
      description:
        "The term “domestic dog” refers to any of several hundred breeds of dog in the world today. While these animals vary drastically in appearance, every dog—from ...",
      url: "https://www.nationalgeographic.com/animals/mammals/facts/domestic-dog",
      keywords: "domestic dog",
      icon: "https://www.nationalgeographic.com/favicon.ico",
    },
                            {
      title: "National Geographic | Tigers 101",
      description:
        "Warning: This video contains sensitive material. Tigers are icons of beauty, power, and the importance of conservation. Learn five surprising facts about these striped felines...",
      url: "https://education.nationalgeographic.org/resource/tigers-101/",
      keywords: "tigers",
      icon: "https://www.nationalgeographic.com/favicon.ico",
    },
                        {
      title: "National Geographic | Sea Turtles 101",
      description:
        "Sea turtles have existed since the time of the dinosaurs. Find out about the ancient mariners' oldest known ancestor, how certain adaptations may have helped the reptiles survive, and the conservation efforts being made to save these creatures.",
      url: "https://education.nationalgeographic.org/resource/sea-turtles-101/",
      keywords: "turtles",
      icon: "https://www.nationalgeographic.com/favicon.ico",
    },
            {
      title: "TurtleWave Youtube Channel",
      description:
        "The real TurtleWave Youtube Channel",
      url: "https://www.youtube.com/@TurtleWaveOfficial",
      keywords: "turtlewave",
      icon: "https://www.youtube.com/favicon.ico",
    },
        {
      title: "Show all logged websites",
      description:
        "Show all logged websites on TurtleWave Search",
      url: "/test/all-logged-websites.html",
      keywords: "turtlewave search all logged results",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=",
    },
            {
      title: "TurtleWave Music Player",
      description:
        "Listen to music on TurtleWave",
      url: "https://turtwave.netlify.app/music-player/",
      keywords: 'heavy metal, music, song, spotify',
      icon: "https://www.google.com/s2/favicons?sz=64&domain=",
    },
    {
      title: "AFV",
      description:
        "Submit your own video for a chance to win up to $100000! Find out where to watch America's Funniest Home Videos (AFV). Airing Sundays 7/6C on ABC.",
      url: "https://afv.com",
      keywords: "funny videos online, afv, shows",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=afv.com",
    },
        {
      title: "Wordle",
      description:
        "Wordle on New York Times",
      url: "https://www.nytimes.com/games/wordle/index.html",
      keywords: "wordle, puzzle",
      icon: "https://static01.nyt.com/images/2022/03/02/crosswords/alpha-wordle-icon-new/alpha-wordle-icon-new-square320-v3.png?format=pjpg&quality=75&auto=webp&disable=upscale",
    },
            {
      title: "ChatGPT",
      description:
        "ChatGPT is a free-to-use AI system. Use it for engaging conversations, gain insights, automate tasks, and witness the future of AI, all in one place.",
      url: "https://chat.openai.com/",
      keywords: "openai, chatgpt, ai",
      icon: "https://chat.openai.com/favicon.ico",
    },
                {
      title: "Gemini",
      description:
        "Bard is now Gemini. Get help with writing, planning, learning, and more from Google AI.",
      url: "https://gemini.google.com/",
      keywords: "ai, bard, google ai",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=gemini.google.com",
    },
                {
      title: "Microsoft Copilot",
      description:
        "Microsoft Copilot leverages the power of AI to boost productivity, unlock creativity, and helps you understand information better with a simple chat.",
      url: "https://copilot.microsoft.com/",
      keywords: "microsoft, copilot",
      icon: "https://copilot.microsoft.com/favicon.ico",
    },
    {
      title: "HTMl loader",
      description: "Run HTML code",
      url: "https://onecompiler.com/html/",
      keywords: "load HTML, HTML loader",
      icon: "https://onecompiler.com/favicon.ico",
    },
    {
      title: "OneCompiler",
      description:
        "Run and create code of many different programming languages",
      url: "https://onecompiler.com",
      keywords: "javascript, html, python, script runner, onecompiler",
      icon: "https://onecompiler.com/favicon.ico",
    },
    {
      title: "Debug internet not working",
      description:
        "If your internet is not connecting/working, try doing some of these: 1: Restart your device 2: Unplug and plug back in your router 3: Try to reconnect 4: Try disconnecting other devices from the network",
      url: "",
      keywords:
        "Internet connection debug, WiFi doesnt work, fix internet, fix wifi, steps on how to fix internet, steps on how to fix router, device wont connect to internet",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1747959967/NewLogoBig_qasvxi.png",
    },
    {
      title: "What is a dog?",
      description:
        " A dog is a domestic mammal of the family Canidae and the order Carnivora. Its scientific name is Canis lupus familiaris. Dogs are a subspecies of the gray wolf, and they are also related to foxes and jackals",
      url: "",
      keywords:
        "what is a dog, what is a wolf, dogs are my favorite animal, info about dogs, popular animals, dogs, wolves",
      icon: "",
    },
        {
      title: "Bible.com",
      description:
        "Read God's Word at anytime, anywhere using the YouVersion Bible App.",
      url: "https://www.bible.com/versions",
      keywords:
        "bible, god's word, jesus, church",
      icon: "https://www.bible.com/favicon.ico",
    },
                    {
      title: "Grammarly",
      description: "Grammarly makes AI writing convenient. Work smarter with personalized AI guidance and text generation on any app or website.",
      url: "https://app.grammarly.com",
      keywords:
        "grammarly",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=grammarly.com",
    },
                        {
      title: "Jimpl",
      description: "Jimpl is a free tool that uncovers hidden metadata in photos, like where and when the picture was taken. It can also remove all personal data from the image so it can be safely shared with others.",
      url: "https://jimpl.com/",
      keywords:
        "jimpl, metadata, image",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=jimpl.com",
    },
                {
      title: "Unsplash",
      description: "The internet’s source for visuals. Powered by creators everywhere",
      url: "https://unsplash.com",
      keywords:
        "unsplash, images",
      icon: "https://unsplash.com/favicon.ico",
    },
            {
      title: "Life.Church",
      description:
        "Maybe you’ve heard what Jesus has done for others. You want to believe He can do the same for you, but you're not sure it's even possible. Jesus made several promises in the Bible—but what do they mean today? Let’s find out in our new series, He Promises.",
      url: "https://www.life.church",
      keywords:
        "bible, god's word, jesus, church",
      icon: "https://www.life.church/favicon.ico",
    },
        {
      title: "Metallica Official Website",
      description:
        "Shop for Metallica Clothing, Merchandise, and Gifts in the Official Metallica Store! Metallica.com is the Official Online Store for Metallica Merch, Music, and Accessories.",
      url: "https://metallica.com",
      keywords:
        "metallica merch",
      icon: "https://www.metallica.com/favicon.ico",
    },
    {
      title: "Instagram",
      description:
        "Instagram is an photo and video sharing social networking service owned by Meta Platforms. It allows users to upload media that can be edited with filters, be organized by hashtags, and be associated with a location via geographical tagging. Posts can be shared publicly or with preapproved followers",
      url: "https://www.instagram.com",
      keywords:
        "Google Mail, Gmail, Mail, Email, E-mail, Mailbox online, Online mailbox",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=instagram.com",
    },
    {
      title: "Gmail",
      description: "Gmail is a free Email service provided by Google",
      url: "https://mail.google.com",
      keywords:
        "Google Mail, Gmail, !App=Google",
      icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    },
    {
      title: "Google Maps",
      description: "Online map of the earth used for navigation",
      url: "https://google.com/maps",
      keywords: "Google Maps, Maps, Geology, Geography, Navigation, !App=Google",
      icon: "https://lh3.googleusercontent.com/9tLfTpdILdHDAvGrRm7GdbjWdpbWSMOa0csoQ8pUba9tLP8tq7M4Quks1xuMQAVnAxVfryiDXRzZ-KDnkPv8Sm4g_YFom1ltQHjQ6Q",
    },
    {
      title: "Google: My Maps",
      description: "Custom Google maps made with shapes and drawings",
      url: "https://mymaps.google.com",
      keywords:
        "Google Maps, Custom Google Maps, Maps, Geology, Geography, !App=Google",
      icon: "https://lh3.googleusercontent.com/9tLfTpdILdHDAvGrRm7GdbjWdpbWSMOa0csoQ8pUba9tLP8tq7M4Quks1xuMQAVnAxVfryiDXRzZ-KDnkPv8Sm4g_YFom1ltQHjQ6Q",
    },
    {
      title: "Google Earth",
      description: "View most of the Earth online",
      url: "https://earth.google.com",
      keywords: "Google Earth, Google Maps, Maps, Geology, Geography, !App=Google",
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Google_Earth_Icon.png",
    },
    {
      title: "Copychar.cc",
      description: "Special characters not on your keyboard",
      url: "https://copychar.cc",
      keywords: "characters, special characters, keyboard",
      icon: "https://pbs.twimg.com/profile_images/1437793943022968832/mGW758NA_400x400.jpg",
    },
    {
      title: "Fast.com",
      description: "View your internet speed",
      url: "https://fast.com",
      keywords: "wifi speed, internet speed, fast",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=fast.com",
    },
    {
      title: "Slides.com",
      description:
        "Slides.com is a website where you can create slides then broadcast your presentations to an audience of any size from anywhere.",
      url: "https://slides.com",
      keywords:
        "google slides, slide maker, free slide maker, free slides maker",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=slides.com",
    },
    {
      title: "Reverse Image Search",
      description:
        "https://reverse.photos allows you to upload images then find similar images online.",
      url: "https://reverse.photos/",
      keywords:
        "how can i find similar photos, similar images, similar photos, similar pngs, reverse image search, reverse.photos, free image apis",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=reverse.photos",
    },
    {
      title: "Remove.bg",
      description: "Remove.bg easily removes the backgrounds from your photos.",
      url: "https://remove.bg",
      keywords:
        "remove backgrounds from photos, remove backgrounds from images, image tools, photoshop, photo tools, remove.bg, unscreen.com",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=remove.bg",
    },
    {
      title: "Unscreen",
      description:
        "Unscreen.com allows you to change the backgrounds from your GIFs or videos.",
      url: "https://unscreen.com",
      keywords:
        "remove backgrounds from videos, remove backgrounds from gifs, video tools, photoshop, gif tools, remove.bg, unscreen.com",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=unscreen.com",
    },
    {
      title: "Futurepedia",
      description: "Discover what AI can do for you",
      url: "https://futurepedia.io",
      keywords: "AI tools",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=unscreen.com",
    },
    {
      title: "OpenAI",
      description:
        'OpenAI is a U.S.-based artificial intelligence (AI) research organization founded in December 2015, researching artificial intelligence with the goal of developing "safe and beneficial" artificial general intelligence.',
      url: "https://openai.com",
      keywords: "AI tools, ChatGPT, OpenAI",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=openai.com",
    },
    {
      title: "Canva",
      description:
        "Make beautiful graphics, presentations, resumes and more with readymade template designs.",
      url: "https://canva.com",
      keywords: "canva.com, graphic designer, photo editor, image editor",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=canva.com",
    },
    {
      title: "MIT App Inventor",
      description:
        "Build your own apps for Android and iOS by dragging blocks instead of writing code.",
      url: "https://appinventor.mit.edu",
      keywords: "block code, app creator, online app maker",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=appinventor.mit.edu",
    },
    {
      title: "10 Minute Mail",
      description: "Free disposable email",
      url: "https://10minutemail.com/",
      keywords:
        "disposable email, 10 minute mail, 10minutemail.com, temporary email address",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=10minutemail.com",
    },
    {
      title: "ESPN",
      description:
        "Visit ESPN for live scores, highlights and sports news. Stream exclusive games on ESPN+ and play fantasy sports",
      url: "https://www.espn.com/",
      keywords: "live sports, live scores, sport highlights, espn",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=espn.com",
    },
    {
      title: "NHL latest scores",
      description: "View the latest NHL scores.",
      url: "https://www.nhl.com/scores",
      keywords:
        "nhl scores, hockey scores, latest hockey news, latest hockey scores, latest nhl scores, latest nhl news",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nhl.com",
    },
    {
      title: "NFL latest scores",
      description: "View the latest NFL scores.",
      url: "https://nfl.com/scores",
      keywords:
        "nfl scores, football scores, latest football news, latest football scores, latest nfl scores, latest nfl news",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nfl.com",
    },
    {
      title: "MLB latest scores",
      description: "View the latest MLB scores.",
      url: "https://mlb.com/scores",
      keywords:
        "mlb scores, baseball scores, latest baseball news, latest baseball scores, latest mlb scores, latest mlb news",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=mlb.com",
    },
    {
      title: "NBA latest scores",
      description: "View the latest NBA scores.",
      url: "https://nba.com/games",
      keywords:
        "nba scores, basketball scores, latest basketball news, latest basketball scores, latest nba scores, latest nba news",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nba.com",
    },
    {
      title: "NHL website",
      description:
        "The official National Hockey League website including news, rosters, stats, schedules, teams, and video.",
      url: "https://www.nhl.com/",
      keywords:
        "live sports, live scores, sport highlights, hockey, latest score, nhl, flyers score",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nhl.com",
    },
    {
      title: "NFL website",
      description: "The official NFL website.",
      url: "https://www.nfl.com/",
      keywords:
        "live sports, live scores, sport highlights, football, latest score, nfl",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nfl.com",
    },
    {
      title: "Cat.com",
      description:
        "Cat® construction equipment sets the standard for the industry.",
      url: "https://www.cat.com/",
      keywords: "construction companies, construction company",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=cat.com",
    },
    {
      title: "MLB website",
      description: "The official MLB website.",
      url: "https://www.mlb.com/",
      keywords:
        "live sports, live scores, sport highlights, baseball, latest score, mlb",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=mlb.com",
    },
    {
      title: "NBA website",
      description: "The official NBA website.",
      url: "https://www.nba.com/",
      keywords:
        "live sports, live scores, sport highlights, basketball, latest score, nba",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nba.com",
    },
    {
      title: "Archive.is",
      description: "Archive websites, even when they're gone",
      url: "https://archive.is",
      keywords: "archives, websites, visit",
      icon: "https://archive.is/favicon.ico",
    },
    {
      title: "Internet Archive",
      description:
        "View thousands of archived music, videos, websites, and more",
      url: "https://archive.org",
      keywords:
        "archives, websites, visit, wayback machine, good days, time, past",
      icon: "https://archive.org/favicon.ico",
    },
    {
      title: "Story creator",
      description: "Create a story",
      url: "/turtlewave-play/apps/story-creator/",
      keywords: "",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/SmallLogo.png?v=1695339813141",
    },
    {
      title: "I'm feeling sad",
      description:
        "I just wanted to let you know that you're not alone in this. Life can be challenging, but it's in those tough moments that we often find our strength. Reach out to friends, family, or a trusted person to talk about how you're feeling. You've got the resilience to get through this, and brighter days are ahead. Take one step at a time, and don't hesitate to seek help if you need it. You're stronger than you think. Best wishes",
      url: "",
      keywords: "",
      icon: "https://toppng.com/uploads/preview/sad-face-transparent-png-crying-emoji-transparent-background-11562873850hiicomfwuq.png",
      turtlewaveImage:
        "https://toppng.com/uploads/preview/sad-face-transparent-png-crying-emoji-transparent-background-11562873850hiicomfwuq.png",
    },
    {
      title: "JS code runner",
      description: "Run code with TurtleWave!",
      url: "/versions/code/",
      keywords:
        "javascript code runner, javascript script runner, what is javascript",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/SmallLogo.png?v=1695339813141",
    },
    {
      title: "TurtleWave Browser Codes",
      description: "Codes",
      url: "/codes/",
      keywords: "Codes, Enter codes, Redeem codes",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/SmallLogo.png?v=1695339813141",
    },
    {
      title: "TurtleWave Verify",
      description: "TurtleWave Verify API",
      url: "/turtlewave-verify/",
      keywords: "TurtleWave Verify, Verify, Capatcha",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/SmallLogo.png?v=1695339813141",
    },
    {
      title: "TurtleWave Browser (and more) updates",
      description: "See the latest updates on TurtleWave Browser and more!",
      url: "/update/update-log-loader/",
      keywords: "TurtleWave Updates, Updates, News",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/SmallLogo.png?v=1695339813141",
    },
    {
      title: "TurtleVideo (TurtleWave Browser Video)",
      description: "Watch and make videos!",
      url: "/turtlevideo/",
      keywords: "TurtleVideo, Video, Content, Fun, YouTube",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/TurtleVideo Logo?v=1695519989369",
    },
    {
      title: "Weather",
      description: "View weather with TurtleWave Browser",
      url: "/weather.html",
      keywords:
        "weather, whats hot, sun, rain, storms, thunder, will it rain today?, will it storm today?, upcoming, how do I prepare for a storm, there is an active storm, help",
      icon: "https://res.cloudinary.com/djzalweis/image/upload/v1747960263/weatherlogo_t7ris7.png",
    },
    {
      title: "Oceanhero",
      description: "Save the ocean by searching the web!",
      url: "https://oceanhero.today/",
      keywords:
        "oceanhero, best search browser, browser, save the turtles, how can I help save the oceans, turtles, and fish, download today, oceanhero.today, best, what do I do, save the oceans!",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=oceanhero.today",
    },
    {
      title: "Who owns turtlewave browser",
      description: "Who made TurtleWave Browser",
      url: "creator.html?",
      keywords:
        "turtlewave browser, who made, creator of turtlewave browser, credits, search engine, search browser, who owns, what is, who is your mom scott, your mom scott",
      icon: "https://cdn.glitch.global/d91692f2-cf09-42f3-a92e-2f88ff8935e0/Help?v=1695257264794",
    },
    {
      title: "Turtle Game",
      description: "TurtleWave Browser's Game!",
      url: "/turtlegame/",
      keywords:
        "turtlewave browser, who made, creator of turtlewave browser, turtle game, search engine, search browser, fun, what is, games, your mom scott",
      icon: "https://cdn.glitch.global/d91692f2-cf09-42f3-a92e-2f88ff8935e0/Help?v=1695257264794",
      turtlewaveImage:
        "https://cdn.glitch.global/d91692f2-cf09-42f3-a92e-2f88ff8935e0/Help?v=1695257264794",
    },
    {
      title: "How to connect roku to iphone",
      description:
        "From the Roku Home screen, select Settings Then move to and open Apple AirPlay and HomeKit. When the settings display, choose AirPlay on the top right so it displays as On. Keep the below items in mind to use AirPlay from your Apple device to your Roku: Your Roku and Apple device must be connected to the same Wi-Fi network.",
      url: "",
      keywords:
        "roku, screen, iphone, help, how to, apple, mac, iphone airplay, what do I do, help me with roku",
      icon: "https://logos-world.net/wp-content/uploads/2021/02/Roku-Logo.png",
      turtlewaveImage:
        "https://logos-world.net/wp-content/uploads/2021/02/Roku-Logo.png",
    },
    {
      title: "Difference between Minecraft world_surface and world_surface_wg",
      description:
        "In simple terms, world_surface_wg will cut through more blocks then world_surface. For example, world_surface_wg might cut through a huge part of a mountain, but world_surface is less likely to do that.",
      url: "",
      keywords:
        "java, javascript, javascript, json, what is world_surface_wg, difference between world_surface and world_surface_wg",
      icon: "",
    },
    {
      title: "Discord",
      description:
        "Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.",
      url: "https://discord.com/",
      keywords: "discord, texting, friends, gaming, servers, nitro",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=discord.com",
      turtlewaveImage:
        "https://www.google.com/s2/favicons?sz=64&domain=discord.com",
    },
    {
      title: "TurtleWave's HelpBot",
      description:  "Explore the newest way to discover and chat with HelpBot's text and voice models.",
      url: "/beta/helpbot/",
      keywords: "turtlewave glitches, contact us, turtlewave helpbot, helpbot, help bot",
      icon: "https://cdn.glitch.global/79f74975-6eed-4db0-9279-4a08dd230572/helpbot.png?v=1711777046912",
      subpages: ": models.html"
    },
    {
      title: "Reddit",
      description: "The front page of the internet.",
      url: "https://www.reddit.com/",
      keywords: "reddit, social media, news, discussion, community",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=reddit.com",
      turtlewaveImage:
        "https://www.google.com/s2/favicons?sz=64&domain=reddit.com",
    },
    {
      title: "X",
      description: "Website ruined by Elon Musk.",
      url: "https://twitter.com/",
      keywords: "twitter, social media, tweets, trending",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=twitter.com",
      turtlewaveImage:
        "https://www.google.com/s2/favicons?sz=64&domain=twitter.com",
    },
    {
      title: "Netflix",
      description: "Watch TV shows & movies online.",
      url: "https://www.netflix.com/",
      keywords: "netflix, streaming, movies, TV shows, entertainment",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=netflix.com",
      turtlewaveImage:
        "https://www.google.com/s2/favicons?sz=64&domain=netflix.com",
    },
    {
      title: "Turtle Pictures Online",
      description: "Browse hundreds of Turtle Pictures",
      url: "https://pixabay.com/images/search/turtle/",
      keywords:
        "Pictures, pic, Picture, Turtle, Turtles, Turtle Pictures, Turtles Picture, Turtle Pictures Online",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=pixabay.com",
      turtlewaveImage:
        "https://tse1.mm.bing.net/th?id=OIP.MAkg-TazN3AE5A9IrnrUGQHaCB&pid=Api",
    },
    {
      title: "Weather Forecast",
      description: "Latest Weather Forecast",
      url: "https://weather.com/",
      keywords:
        "Weather, Rain, Cloudy, Cloud, Clouds, Forecast, Thunder, Storm",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=weather.com",
    },
    {
      title: "Llama pictures",
      description: "FREE llama pictures online",
      url: "https://pixabay.com/images/search/llama/",
      keywords: "Llama pictures, animals, llama pics, llamas",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=pixabay.com",
    },
    {
      title: "Hopscotch Block Coding",
      description: "Code with blocks",
      url: "https://explore.gethopscotch.com/c/masterpieces",
      keywords:
        "coding, block coding, block code, kid friendly, coding for kids, coding made easy",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=explore.gethopscotch.com",
    },
    {
      title: "Fortnite",
      description: "Fortnite is an online third person shooter video-game where users can play user-made and default maps and fight other players. The last one standing wins the round.",
      url: "https://www.fortnite.com/",
      keywords: "Gun game, Fortnite, Battle",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=fortnite.com" },
  
    {
      title: "Apple",
      description:
        "Apple Inc. is an American multinational corporation and technology company headquartered in Cupertino, California, in Silicon Valley. It designs, develops, and sells consumer electronics, computer software, and online services. Devices include the iPhone, iPad, Mac, Apple Watch, Vision Pro, and Apple TV.",
      url: "https://www.apple.com/",
      keywords: "Apple, Phones, Iphone, Steve Jobs, Ipad, Tablet",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=apple.com",
    },
    {
      title: "Android",
      description:
        "Android is a mobile operating system based on a modified version of the Linux kernel and other open-source software, designed primarily for touchscreen mobile devices such as phones and tablets.",
      url: "https://www.android.com/",
      keywords: "Android, Phones, Google Phone, Linux, phone ",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=android.com",
    },
    {
      title: "Bing",
      description: "Microsoft's Search Engine",
      url: "https://www.bing.com",
      keywords: "Bing, Search, Google",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://bing.com",
    },
    {
      title: "Cat Pictures",
      description: "Hundreds of online cat pictures",
      url: "https://www.pexels.com/search/cat/",
      keywords: "Cats, Animals, Pictures, !animal.cat",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=pexels.com",
    },
        {
      title: "Cat - Wikipedia",
      description: "The cat (Felis catus), commonly referred to as the domestic cat or house cat, is a small domesticated carnivorous mammal.",
      url: "https://en.wikipedia.org/wiki/Cat",
      keywords: "Cats, Wikipedia, !animal.cat",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
            {
      title: "Tabby Cat - Wikipedia",
      description: "A tabby cat, or simply tabby, is any domestic cat (Felis catus) with a distinctive M-shaped marking on their forehead, stripes by their eyes and across their cheeks, along their back, around their legs and tail, and characteristic striped, dotted, lined, flecked, banded, or swirled patterns on the body: neck, shoulders, sides, flanks, chest, and abdomen. ",
      url: "https://en.wikipedia.org/wiki/Tabby_cat",
      keywords: "Cats, Wikipedia, !animal.cat.tabby, Tabby",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
                {
      title: "Golden Retriever - Wikipedia",
      description: "The Golden Retriever is a Scottish breed of retriever dog of medium size. It is characterised by a gentle and affectionate nature and a striking golden coat.",
      url: "https://en.wikipedia.org/wiki/Golden_Retriever",
      keywords: "Dogs, Wikipedia, !animal.dog.golden_retriever, Golden Retrievers",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
                {
      title: "Persian Cat - Wikipedia",
      description: "The Persian cat, also known as the Persian Longhair, is a long-haired breed of cat characterised by a round face and short muzzle. ",
      url: "https://en.wikipedia.org/wiki/Persian_cat",
      keywords: "Cats, Wikipedia, !animal.cat.persian, persian",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
                    {
      title: "Ragdoll Cat - Wikipedia",
      description: "The Ragdoll is a breed of cat with a distinct colorpoint coat and blue eyes. Its morphology is large and weighty, and it has a semi-long and silky soft coat.",
      url: "https://en.wikipedia.org/wiki/Ragdoll_cat",
      keywords: "Cats, Wikipedia, !animal.cat.ragdoll, ragdoll",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
                            {
      title: "Exotic Shorthair Cat - Wikipedia",
      description: "In the late 1950s, the Persian was used as an outcross by some American Shorthair breeders. This was done in secret in order to improve their body type, and crosses were also made with the Russian Blue and the Burmese.",
      url: "https://en.wikipedia.org/wiki/Exotic_Shorthair",
      keywords: "Cats, Wikipedia, !animal.cat.exotic_shorthair, exotic shorthair",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
                        {
      title: "Amercian Shorthair Cat - Wikipedia",
      description: "When settlers sailed from Europe to North America, they carried cats on board (ships' cats) to protect the stores from mice. For instance, the cats that came over on the Mayflower with the Pilgrims to hunt rats on the ship and in the colony.",
      url: "https://en.wikipedia.org/wiki/American_Shorthair",
      keywords: "Cats, Wikipedia, !animal.cat.amercian_shorthair, amercian shorthair",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
            {
      title: "Dog - Wikipedia",
      description: "The dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of the wolf.",
      url: "https://en.wikipedia.org/wiki/Dog",
      keywords: "dogs, wikipedia, !animal.dog",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
                {
      title: "Pug - Wikipedia",
      description: "The Pug is a breed of dog with the physically distinctive features of a wrinkly, short-muzzled face, and curled tail.",
      url: "https://en.wikipedia.org/wiki/Pug",
      keywords: "pugs, wikipedia, !animal.dog.pug",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
                    {
      title: "Beagle - Wikipedia",
      description: "The beagle is a breed of small scent hound, similar in appearance to the much larger foxhound.",
      url: "https://en.wikipedia.org/wiki/Beagle",
      keywords: "beagles, wikipedia, !animal.dog.beagle",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
                        {
      title: "Pit bull - Wikipedia",
      description: "Pit bull is an umbrella term for several types of dog believed to have descended from bull and terriers.",
      url: "https://en.wikipedia.org/wiki/Pit_bull",
      keywords: "pitbulls, wikipedia, !animal.dog.beagle",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=wikipedia.com",
    },
    {
      title: "Dog Pictures",
      description: "Hundreds of online dog pictures",
      url: "https://www.pexels.com/search/dog/",
      keywords: "Dogs, Animals, Pictures, !animal.dog",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=pexels.com",
    },
    {
      title: "Scratch",
      description:
        "Imagine, Program, Share. Scratch is a block coding site for kids.",
      url: "https://scratch.mit.edu/",
      keywords: "Scratch, Programming, Kids, Programming for kids",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=scratch.mit.edu",
    },
    {
      title: "Turtle Song",
      description: "Turtle Song by Parry Gripp",
      url: "https://www.youtube.com/watch?v=LRWAFQqQY9Y",
      keywords: "turtles, parry gripp",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com",
    },
    {
      title: "Your mom scott",
      description: "Creator of TurtleWave Browser",
      url: "https://www.youtube.com/@yourmomscott/videos",
      keywords: "Channel, youtube, new, video, videos",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com",
    domainName: "YouTube",
    },
    {
      title: "Is It Thursday?",
      description: "Well then, is it Thursday?.",
      url: "https://isitthursday.org",
      keywords: "thursday",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=isitthursday.org",
    },
    {
      title: "Facebook",
      description:
        "Facebook is a social media and technology company that operates the world's largest social networking platform, connecting billions of people worldwide.",
      url: "https://www.facebook.com/",
      keywords: "facebook",
      icon: "https://facebook.com/favicon.ico",
    },
    {
      title: "Microsoft",
      description:
        "Microsoft Corporation is a multinational technology company that develops, manufactures, licenses, and sells software, hardware, and services. It is best known for its operating systems, such as Windows, and productivity software like Microsoft Office. Microsoft is one of the world's largest technology companies and has a significant presence in various tech-related fields, including cloud computing, gaming, and artificial intelligence.",
      url: "https://www.microsoft.com/",
      keywords: "microsoft",
      icon: "https://microsoft.com/favicon.ico",
    },
    {
      title: "Alibaba",
      description:
        "Alibaba Group Holding Limited is a Chinese multinational conglomerate specializing in e-commerce, retail, internet, and technology. It operates popular online marketplaces, including Alibaba.com, Taobao, and Tmall, and is considered one of the largest and most influential e-commerce companies globally.",
      url: "https://www.alibaba.com/",
      keywords: "alibaba, shopping, retail",
      icon: "https://alibaba.com/favicon.ico",
    },
    {
      title: "Tencent",
      description:
        "Tencent Holdings Limited is a Chinese technology conglomerate known for its internet-related services and products. It is a leading provider of social media, gaming, entertainment, and mobile payment platforms. Tencent is one of the largest and most valuable technology companies in the world.",
      url: "https://www.tencent.com/",
      keywords: "tencent",
      icon: "https://tencent.com/favicon.ico",
    },
    {
      title: "Airbnb",
      description:
        "Airbnb Inc. is an online marketplace and hospitality service platform that enables people to rent or lease short-term lodging, including vacation rentals, apartments, homes, and unique accommodations, in various locations globally.",
      url: "https://www.airbnb.com/",
      keywords: "airbnb, booking, vacation",
      icon: "https://airbnb.com/favicon.ico",
    },
    {
      title: "Lyft",
      description:
        "Lyft Inc. is a transportation network company that operates a ridesharing platform, connecting passengers with drivers through a mobile app. Lyft offers on-demand transportation services in many cities, providing an alternative to traditional taxi services.",
      url: "https://www.lyft.com/",
      keywords: "lyft, taxi, food",
      icon: "https://lyft.com/favicon.ico",
    },
    {
      title: "Spotify",
      description:
        "Spotify is a digital music streaming service that allows users to access a vast library of songs, podcasts, and audio content from various artists and creators. Users can listen to music on-demand, create playlists, and discover new tracks based on their preferences.",
      url: "https://open.spotify.com/",
      keywords: "spotify, music, playlists, songs",
      icon: "https://spotify.com/favicon.ico",
      subpages: ": /search, /collection",
    },
    {
      title: "Yahoo!",
      description:
        "Yahoo! is a web services provider and internet company known for its search engine, email services, news, and various online portals. It was once a major player in the early days of the internet and offered a wide range of services, but its influence has diminished over the years.",
      url: "https://www.yahoo.com/",
      keywords: "yahoo, yahoo!, search engine",
      icon: "https://yahoo.com/favicon.ico",
            subpages: ": /search",
    },
    {
      title: "Snapchat",
      description:
        "Snapchat is a multimedia messaging app that allows users to send and receive photos, videos, and messages, known as 'snaps,' which disappear after being viewed by the recipient. It also features stories, filters, and various creative tools for users to share content with their friends and followers in a temporary and engaging way.",
      url: "https://www.snapchat.com/",
      keywords: "snapchat, messaging, video calls",
      icon: "https://snapchat.com/favicon.ico",
    },
    {
      title: "Pinterest",
      description:
        "Pinterest is a visual discovery and bookmarking platform that allows users to discover and save ideas, images, and videos related to their interests and hobbies. Users can create virtual collections, known as 'boards,' to organize and share their favorite content, including recipes, DIY projects, fashion ideas, and more.",
      url: "https://www.pinterest.com/",
      keywords: "pinterest, pictures, sharing, social",
      icon: "https://pinterest.com/favicon.ico",
    },
    {
      title: "Dropbox",
      description:
        "Dropbox is a cloud-based file hosting and collaboration service that allows users to store and share files, documents, photos, and videos securely. It offers synchronization across devices, making it easy for users to access their files from any device with an internet connection. Dropbox is widely used for personal and business purposes, facilitating seamless file management and data backup.",
      url: "https://www.dropbox.com/",
      keywords: "dropbox, cloud storage",
      icon: "https://dropbox.com/favicon.ico",
    },
    {
      title: "LinkedIn",
      description:
        "LinkedIn is a professional social networking platform designed for networking, job searching, and career development. It allows users to create professional profiles, connect with colleagues and industry professionals, and share updates and articles related to their field of expertise. LinkedIn is widely used by professionals and businesses to build professional relationships and showcase their skills and qualifications.",
      url: "https://www.linkedin.com/",
      keywords: "linkedin, jobs, social media, social networking",
      icon: "https://linkedin.com/favicon.ico",
    },
    {
      title: "Zoom Video Communications",
      description:
        "Zoom Video Communications, Inc. is a video conferencing and virtual meeting platform that enables users to host and participate in online video meetings, webinars, and virtual events. Zoom offers features such as screen sharing, chat, breakout rooms, and integration with other collaboration tools, making it a popular choice for remote work, online education, and virtual gatherings.",
      url: "https://zoom.us/",
      keywords: "zoom video communications, meetings, classes",
      icon: "https://zoom.us/favicon.ico",
    },
    {
      title: "ZoomInfo",
      description:
        "ZoomInfo is a business-to-business (B2B) data and intelligence platform that provides comprehensive information about companies, contacts, and industries. It offers access to a vast database of business data, including company profiles, executive information, and contact details, empowering sales and marketing professionals to identify and engage with potential customers and prospects. ZoomInfo helps businesses improve their sales and marketing efforts by providing valuable insights and data-driven intelligence.",
      url: "https://www.zoominfo.com/",
      keywords: "zoominfo",
      icon: "https://zoominfo.com/favicon.ico",
    },
    {
      title: "TikTok",
      description:
        "TikTok is a popular social media app for sharing short-form videos. Users can create and upload videos of up to 60 seconds, often featuring music, dance, comedy, and other creative content. TikTok's algorithm uses machine learning to curate a personalized feed of videos for each user, making it a highly engaging platform for discovering and sharing viral trends and challenges.",
      url: "https://www.tiktok.com/",
      keywords: "tiktok, bytedance, trends, for you",
      icon: "https://tiktok.com/favicon.ico",
    },
    {
      title: "Shopify",
      description:
        "Shopify is an e-commerce platform that enables businesses to set up and run their online stores. It provides a user-friendly interface and a suite of tools for managing products, inventory, payments, and shipping. Shopify allows businesses to create a customizable and professional online store without the need for extensive technical knowledge. It is widely used by small and medium-sized businesses to sell products and services online.",
      url: "https://www.shopify.com/",
      keywords: "shopify, sales management",
      icon: "https://shopify.com/favicon.ico",
    },
    {
      title: "Salesforce",
      description:
        "Salesforce is a customer relationship management (CRM) software and cloud computing company. It offers a suite of tools and services that help businesses manage and automate various aspects of their customer interactions, sales processes, marketing campaigns, and customer support. Salesforce's CRM platform is used by businesses of all sizes to improve customer relationships, streamline operations, and drive business growth.",
      url: "https://www.salesforce.com/",
      keywords: "salesforce, sales management",
      icon: "https://salesforce.com/favicon.ico",
    },
    {
      title: "Tesla, Inc.",
      description:
        "Tesla, Inc. is an electric vehicle (EV) and clean energy company founded by Elon Musk. It designs, manufactures, and sells electric cars, energy storage products, and solar energy solutions. Tesla is known for its innovative electric vehicles, such as the Model S, Model 3, Model X, and Model Y, which have gained popularity for their performance, range, and sustainability. The company is a pioneer in advancing the adoption of electric vehicles and renewable energy technologies.",
      url: "https://www.tesla.com/",
      keywords: "tesla, vehicles, electric",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=tesla.com",
    },
    {
      title: "Baidu",
      description:
        "Baidu, Inc. is a Chinese technology company and one of the largest internet search engine providers in China. It offers a wide range of online products and services, including its search engine, Baidu.com, which is the most popular search engine in China. Baidu also provides various other services such as online advertising, cloud computing, artificial intelligence, and autonomous driving technologies. It is often referred to as the 'Google of China' due to its dominant position in the Chinese internet market.",
      url: "https://www.baidu.com/",
      keywords: "baidu, search engine, china",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=baidu.com",
    },
    {
      title: "JD.com",
      iption:
        "JD.com, Inc., also known as Jingdong, is one of the largest e-commerce companies in China. It operates an online retail platform that offers a wide range of products, including electronics, fashion, home appliances, and more. JD.com is known for its efficient logistics and delivery network, providing fast and reliable shipping services to customers across China. The company is a major player in the Chinese e-commerce market and competes with other giants like Alibaba and Tencent.",
      url: "https://www.jd.com/",
      keywords: "jd, jd.com, delivery",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=jd.com",
    },
    {
      title: "Sony",
      description:
        "Sony Corporation is a Japanese multinational conglomerate known for its diverse range of consumer electronics, entertainment, and gaming products and services. It designs, manufactures, and sells products such as TVs, cameras, smartphones, audio devices, and PlayStation gaming consoles. Sony is also involved in the production and distribution of movies, music, and television content through its entertainment divisions. The company has a significant global presence and is recognized for its innovation and technological advancements in various industries.",
      url: "https://www.sony.com/",
      keywords: "sony, gaming, playstation",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=sony.com",
    },
    {
      title: "Samsung Electronics",
      description:
        "Samsung Electronics Co., Ltd. is a South Korean multinational technology company and a leading manufacturer of consumer electronics, semiconductors, and other technology-related products. Samsung produces a wide range of products, including smartphones, televisions, home appliances, memory chips, and display panels. It is one of the largest and most influential technology companies globally and is known for its cutting-edge innovation and high-quality products.",
      url: "https://www.samsung.com/",
      keywords: "samsung, samsung electronics",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=samsung.com",
    },
    {
      title: "Xiaomi",
      description:
        "Xiaomi Corporation is a Chinese multinational electronics company known for its smartphones, smart home devices, and other consumer electronics products. Xiaomi is one of the largest smartphone manufacturers in the world and has a significant presence in various global markets. The company is recognized for offering high-quality products at competitive prices, often referred to as 'Mi' devices, and for its strong online sales model. Xiaomi also produces a range of smart home products under its sub-brand 'Mi Home.'",
      url: "https://www.mi.com/",
      keywords: "xiaomi, technology, mi",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=mi.com",
    },
    {
      title: "IBM",
      description:
        "IBM (International Business Machines Corporation) is an American multinational technology company with a long history in the computer and information technology industry. IBM is involved in various business areas, including hardware, software, cloud computing, artificial intelligence, and consulting services. It is known for its mainframe computers, as well as its contributions to the development of computing technology and software solutions. IBM is one of the largest technology companies globally and has a significant impact on the IT industry and enterprise solutions.",
      url: "https://www.ibm.com/",
      keywords: "ibm",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=ibm.com",
    },
    {
      title: "Oracle",
      description:
        "Oracle Corporation is an American multinational technology company specializing in database software, cloud computing, and enterprise software solutions. It is one of the leading providers of database management systems and offers a wide range of products and services for businesses and organizations, including customer relationship management (CRM) software, enterprise resource planning (ERP) systems, and cloud infrastructure services. Oracle is a major player in the enterprise software market and serves a diverse customer base, ranging from small businesses to large enterprises worldwide.",
      url: "https://www.oracle.com/",
      keywords: "oracle, virtualbox, vm, java",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=oracle.com",
    },
    {
      title: "Adobe Inc.",
      description:
        "Adobe Inc. is an American multinational software company known for its creative software products and digital marketing solutions. Adobe's flagship products include Photoshop (for image editing), Illustrator (for vector graphics), InDesign (for page layout design), and Premiere Pro (for video editing). These tools are widely used by artists, designers, and creative professionals worldwide. Adobe also offers marketing and analytics software solutions for businesses to manage their digital marketing campaigns and customer experiences. The company has a significant presence in the creative and marketing industries and is a major player in the software market.",
      url: "https://www.adobe.com/",
      keywords: "adobe, creative cloud",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=adobe.com",
    },
    {
      title: "Slack Technologies",
      description:
        "Slack Technologies, Inc. is an American software company that develops and operates Slack, a popular cloud-based collaboration platform. Slack is designed to facilitate team communication and collaboration in the workplace, providing channels for messaging, file sharing, and integration with various third-party services. The platform enables users to organize conversations by topics, projects, or teams, making it easy to search and retrieve information. Slack has gained widespread adoption in businesses and organizations as a central hub for team communication, improving productivity and fostering efficient teamwork.",
      url: "https://slack.com/",
      keywords: "slack",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=slack.com",
    },
    {
      title: "Square, Inc.",
      description:
        "Square, Inc. is an American financial services and mobile payment company. It was founded by Jack Dorsey, the co-founder and CEO of Twitter. Square offers a range of products and services for businesses, including point-of-sale systems, payment processing solutions, and mobile payment apps. One of Square's most popular products is the Square Reader, a small device that attaches to a smartphone or tablet and allows businesses to accept credit card payments on the go. Square's platform has made it easier for small businesses and individuals to accept electronic payments and manage their finances. Additionally, Square offers other financial services, such as business loans and cash management solutions, further expanding its offerings in the financial technology (fintech) space.",
      url: "https://squareup.com/",
      keywords: "square, square inc",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=squareup.com",
    },
    {
      title: "PayPal",
      description:
        "PayPal Holdings, Inc. is an American online payment company that provides digital payment solutions and services for individuals and businesses. PayPal allows users to make secure online transactions, transfer money, and receive payments electronically. It is widely used for e-commerce transactions, peer-to-peer transfers, and online payments for goods and services. Users can link their bank accounts, credit cards, or PayPal balance to their account for easy and convenient payment processing. PayPal has become a trusted and widely accepted payment platform, facilitating transactions in various currencies and countries around the world.",
      url: "https://www.paypal.com/",
      keywords: "paypal, money transfer",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=paypal.com",
    },
    {
      title: "eBay",
      description:
        "eBay Inc. is an American multinational e-commerce corporation known for its online marketplace. It operates one of the world's largest and most popular online auction and shopping websites. eBay provides a platform for individuals and businesses to buy and sell a wide range of products, including new and used items, collectibles, electronics, fashion, and more. Users can list items for auction-style bidding or offer them at a fixed price using the 'Buy It Now' option. eBay's global reach and diverse product selection have made it a significant player in the e-commerce industry, connecting buyers and sellers from around the world.",
      url: "https://www.ebay.com/",
      keywords: "ebay, selling,",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=ebay.com",
    },
    {
      title: "Bilibili",
      description:
        "Bilibili, often referred to as BiliBili (stylized as bilibili), is a Chinese online video platform that focuses on anime, comics, and games (ACG) content. It is one of the largest and most popular video-sharing websites in China, particularly among the younger generation. Bilibili's platform allows users to upload, share, and watch a wide range of ACG-related videos, including animations, comics, gameplay, and fan-made content. The site also features live streaming, virtual gifts, and a vibrant community of users who interact through comments and bullet chat. Bilibili has become a significant hub for ACG culture and is known for its strong community engagement and enthusiastic fanbase.",
      url: "https://www.bilibili.com/",
      keywords: "bilibili",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=bilibili.com",
    },
    {
      title: "Zillow Group",
      description:
        "Zillow Group is an American online real estate company that operates several popular real estate and rental marketplaces. It is one of the largest and most well-known platforms in the real estate industry. Zillow Group owns and operates brands such as Zillow, Trulia, StreetEasy, and HotPads. These platforms offer services for buying, selling, renting, and financing properties. Zillow Group's websites and apps provide users with extensive property listings, home value estimates, and valuable real estate data, helping them make informed decisions in the housing market. The company's innovative approach to real estate technology has made it a prominent player in the real estate industry.",
      url: "https://www.zillowgroup.com/",
      keywords: "zillow, zillow group",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=zillowgroup.com",
    },
    {
      title: "Expedia Group",
      description:
        "Expedia Group is an American online travel company that operates various travel booking platforms. It is one of the largest online travel agencies in the world. Expedia Group owns and operates several brands, including Expedia.com, Hotels.com, Orbitz, Travelocity, Hotwire, and others. These platforms offer services for booking flights, hotels, rental cars, vacation packages, and activities. Expedia Group's websites and apps provide travelers with a wide range of travel options and deals, making it easier for them to plan and book their trips. The company's global presence and diverse portfolio of travel brands make it a significant player in the online travel industry.",
      url: "https://www.expediagroup.com/",
      keywords: "expedia, vacations",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=expediagroup.com",
    },
    {
      title: "Booking Holdings",
      description:
        "Booking Holdings Inc. is an American travel company that operates various online travel platforms. It is one of the largest and most influential companies in the online travel industry. Booking Holdings owns and operates several well-known brands, including Booking.com, Priceline.com, Agoda, Kayak, and OpenTable. These platforms offer services for booking hotels, flights, rental cars, vacation packages, and restaurant reservations. Booking Holdings' websites and apps provide travelers with a convenient and user-friendly way to search, compare, and book travel accommodations and services worldwide.",
      url: "https://www.bookingholdings.com/",
      keywords: "booking, vacations, booking.com",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=bookingholdings.com",
    },
    {
      title: "The Weather Network",
      description:
        "The Weather Network is a Canadian-based media company that provides weather forecasts and related weather news and information. It offers weather updates for various regions, including cities and towns across Canada and other parts of the world. The Weather Network delivers forecasts through its website, mobile app, and television channel, catering to the needs of viewers, travelers, and outdoor enthusiasts seeking accurate and up-to-date weather information.",
      url: "https://www.theweathernetwork.com/ca",
      keywords: "weather, weather network, forecast",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=theweathernetwork.com/ca",
    },
    {
      title: "TripAdvisor",
      description:
        "TripAdvisor is an American travel and restaurant website that provides reviews, recommendations, and information for travelers. It offers user-generated content, including reviews, ratings, and photos, for hotels, restaurants, attractions, and other travel-related businesses worldwide. TripAdvisor helps travelers plan their trips by providing insights and feedback from other travelers, enabling them to make informed decisions about where to stay, eat, and visit. The platform has become a go-to resource for travelers seeking authentic and reliable travel advice and recommendations.",
      url: "https://www.tripadvisor.com/",
      keywords: "tripadvisor, vacations",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=tripadvisor.com",
    },
    {
      title: "iQiyi",
      description:
        "iQiyi is a Chinese online video streaming platform that offers a wide range of TV shows, movies, and original content. It is one of the largest and most popular video streaming services in China and is often referred to as the 'Netflix of China.' iQiyi provides both free and paid subscription options, allowing users to access a vast library of Chinese and international content. The platform has a strong focus on producing original content and has become a major player in the online video market in China and beyond.",
      url: "https://www.iqiyi.com/",
      keywords: "iqiyi, streaming service",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=iQiyi.com",
    },
    {
      title: "Hulu",
      description:
        "Hulu is an American subscription video streaming service that offers a vast library of TV shows, movies, and original content. It allows users to watch their favorite TV shows and movies on-demand, as well as offering live TV streaming options. Hulu provides a wide range of content from various networks and studios, making it a popular choice for cord-cutters and those looking for a diverse selection of entertainment options. The platform also produces original series and exclusive content, further enhancing its appeal to subscribers.",
      url: "https://www.hulu.com/",
      keywords: "hulu, streaming service",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=hulu.com",
    },
    {
      title: "Electronic Arts",
      description:
        "Electronic Arts Inc. (EA) is an American video game company known for developing and publishing a wide range of popular video games. EA is one of the largest and most influential game publishers in the industry. The company is behind many well-known game franchises, including FIFA, Madden NFL, The Sims, Battlefield, Need for Speed, and Star Wars: Battlefront, among others. EA's games cover various genres, including sports, action, simulation, and role-playing games, catering to a broad audience of gamers worldwide.",
      url: "https://www.ea.com/",
      keywords: "electronic arts, ea",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=ea.com",
    },
    {
      title: "Activision Blizzard",
      description:
        "Activision Blizzard, Inc. is an American video game company formed by the merger of Activision and Blizzard Entertainment. It is one of the largest and most successful video game companies in the world. Activision Blizzard is known for its popular game franchises, including Call of Duty, World of Warcraft, Overwatch, Diablo, and Candy Crush. The company develops and publishes games for various platforms, including consoles, PC, and mobile devices. Activision Blizzard is a major player in the gaming industry and has a massive global player base across its diverse portfolio of games.",
      url: "https://www.activisionblizzard.com/",
      keywords: "activision, blizzard",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=activisionblizzard.com",
    },
    {
      title: "Stack Overflow",
      description:
        "Stack Overflow is a popular online community and knowledge-sharing platform for programmers and developers. It serves as a question-and-answer (Q&A) website where developers can post questions related to programming, software development, and various technical topics. Other community members can then provide answers and solutions to these questions. Stack Overflow has a reputation-based system that rewards users for contributing valuable answers and helping others. The platform has become a valuable resource for programmers seeking solutions to coding challenges, troubleshooting issues, and learning from the expertise of a large community of developers worldwide.",
      url: "https://stackoverflow.com/",
      keywords: "stackoverflow, stackexchange",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com",
    },
    {
      title: "Xbox",
      description:
        "Xbox is a brand of video game consoles and gaming services created and owned by Microsoft. The Xbox brand was first introduced in 2001 with the launch of the original Xbox console. Since then, Microsoft has released several generations of Xbox consoles, including the Xbox 360, Xbox One, and the latest Xbox Series X|S. Xbox consoles are known for their powerful hardware, immersive gaming experiences, and a wide range of multimedia capabilities. They offer a diverse library of games, including exclusive titles and popular third-party releases. Xbox Live, Microsoft's online gaming service, enables players to connect, play multiplayer games, and access various entertainment apps. The Xbox ecosystem has a robust community of gamers and content creators, fostering a thriving gaming culture.",
      url: "https://www.xbox.com/",
      keywords: "xbox, xbox series x, xbox series s, xbox live, gaming, console",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=xbox.com",
    },
    {
      title: "Steam",
      description:
        "Steam is a popular digital distribution platform for video games, developed by Valve Corporation. It offers a vast catalog of games, software, and entertainment content, with features like social networking and multiplayer gaming. Gamers also enjoy seasonal sales events with significant discounts.",
      url: "https://store.steampowered.com/",
      keywords:
        "steam, valve, video games, digital distribution, gaming platform",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=store.steampowered.com",
    },
                   {
      title: "Superbowl Win History",
      description: "View a comprehensive list of every single NFL Super Bowl champion from 1967 to present on ESPN.",
      url: "https://www.espn.com/nfl/superbowl/history/winners",
      keywords: "superbowl, nfl, football",
      icon: "https://www.espn.com/favicon.ico",
      domainName: "ESPN"
    },
    {
      title: "Riot Games",
      description:
        "Riot Games is a renowned American video game developer and publisher, best known for creating the popular online multiplayer game, League of Legends. Founded in 2006, Riot Games has grown into a major player in the gaming industry, expanding its portfolio with titles like Valorant and Legends of Runeterra. League of Legends, in particular, has become a global esports phenomenon, attracting millions of players and fans worldwide. Riot Games is committed to fostering a strong gaming community and supporting competitive esports scenes for its titles. With a focus on innovative gameplay, regular updates, and engaging events, Riot Games continues to shape the landscape of online gaming.",
      url: "https://www.riotgames.com/",
      keywords:
        "riot games, league of legends, valorant, legends of runeterra, esports",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=riotgames.com",
    },
    {
      title: "StackExchange",
      description:
        "StackExchange is a network of Q&A websites covering diverse topics. Users can ask, answer, and vote on questions, creating a valuable resource for knowledge sharing and learning.",
      url: "https://stackexchange.com/",
      keywords: "stackexchange, Q&A, knowledge sharing, stack exchange",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=stackexchange.com",
    },
    {
      title: "Western Digital",
      description:
        "Western Digital is a leading global data storage solutions provider. The company specializes in manufacturing hard disk drives (HDDs), solid-state drives (SSDs), and other data storage products. With a wide range of storage solutions for consumers, businesses, and data centers, Western Digital plays a significant role in enabling data management and storage in today's digital world. Their products are known for their reliability, performance, and innovation, making them a preferred choice for storing and safeguarding valuable data.",
      url: "https://www.westerndigital.com/",
      keywords:
        "western digital, data storage, hard disk drives, solid-state drives, data management",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=westerndigital.com",
    },
    {
      title: "Khan Academy",
      description:
        "Khan Academy is a non-profit educational organization that offers a free online platform for learning and teaching. Founded in 2008, Khan Academy provides a vast library of educational resources, including video lectures, practice exercises, and personalized learning dashboards. The platform covers a wide range of subjects, from mathematics and science to humanities and computer programming. Its mission is to provide accessible and high-quality education to anyone, anywhere, empowering learners of all ages and backgrounds to acquire knowledge and improve their skills at their own pace.",
      url: "https://www.khanacademy.org/",
      keywords:
        "khan academy, education, online learning, video lectures, practice exercises, non-profit",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=khanacademy.org",
    },
    {
      title: "Seagate",
      description:
        "Seagate Technology is a prominent global data storage solutions company. As a leading manufacturer of hard disk drives (HDDs), solid-state drives (SSDs), and other data storage products, Seagate plays a vital role in enabling data storage and management for individuals and organizations. Their products are known for their reliability, performance, and capacity, making them a popular choice for a wide range of applications, from personal computing to enterprise data centers. With a focus on innovation and technological advancements, Seagate continues to drive the evolution of data storage and contribute to the digital infrastructure of the modern world.",
      url: "https://www.seagate.com/",
      keywords:
        "seagate, data storage, hard disk drives, solid-state drives, data management",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=seagate.com",
    },
    {
      title: "LG",
      description:
        "LG, short for Lucky Goldstar, is a South Korean multinational conglomerate known for its diverse range of products and services. LG Electronics, a subsidiary of LG Corporation, is one of the company's most prominent divisions. It is a leading global manufacturer of consumer electronics, home appliances, and mobile devices. LG's product lineup includes smartphones, televisions, refrigerators, washing machines, air conditioners, and more. The company is recognized for its innovation and cutting-edge technology, often incorporating features like OLED displays and AI-powered functionalities into its products. With a commitment to enhancing lifestyles through advanced technology, LG continues to be a significant player in the global consumer electronics market.",
      url: "https://www.lg.com/",
      keywords:
        "LG, Lucky Goldstar, LG Electronics, consumer electronics, home appliances, smartphones, OLED displays, AI technology",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=lg.com",
    },
    {
      title: "SteelSeries",
      description:
        "SteelSeries is a leading gaming peripherals and accessories manufacturer. Established in 2001, the company has become synonymous with high-quality and innovative gaming products. SteelSeries offers a wide range of gaming gear, including gaming mice, keyboards, headsets, mousepads, and controllers. Their products are designed with input from professional gamers, ensuring they meet the demands of competitive gaming. With a focus on precision, performance, and durability, SteelSeries products have garnered a dedicated following among gamers worldwide. The company's commitment to cutting-edge technology and gaming expertise has made it a trusted brand in the gaming community.",
      url: "https://steelseries.com/",
      keywords:
        "SteelSeries, gaming peripherals, gaming gear, gaming mice, gaming keyboards, gaming headsets",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=steelseries.com",
    },
    {
      title: "IKEA",
      description:
        "IKEA is a well-known Swedish multinational retailer of furniture and home accessories. Founded in 1943, IKEA has become one of the world's largest and most popular furniture companies. It offers a wide range of stylish and affordable furniture products for various living spaces, including bedrooms, kitchens, living rooms, and offices. Known for its flat-pack and self-assembly furniture, IKEA has revolutionized the furniture industry, making it more accessible to a broader range of consumers. The company also provides home furnishings, decor, and other household items to complement its furniture offerings. With its iconic blue and yellow branding and a global presence, IKEA is a go-to destination for those seeking modern and functional home solutions.",
      url: "https://www.ikea.com/",
      keywords:
        "IKEA, furniture, home accessories, flat-pack, self-assembly furniture, home furnishings",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=ikea.com",
    },
    {
      title: "Crayola",
      description:
        "Crayola is a renowned American brand that specializes in producing art supplies and creative materials for children and artists alike. Established in 1885, Crayola is best known for its iconic crayons, which have become a staple in classrooms and households worldwide. The brand offers a wide range of products, including colored pencils, markers, paints, and various craft kits. Crayola's commitment to creativity and imagination has made it a beloved brand among children and parents. Their products are designed to inspire artistic expression and foster learning through art. With a rich history and a vast assortment of colorful tools, Crayola continues to be a trusted name in the world of art and creativity.",
      url: "https://www.crayola.com/",
      keywords:
        "Crayola, art supplies, crayons, colored pencils, markers, paints, craft kits, creativity",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=crayola.com",
    },
    {
      title: "Fiskars",
      description:
        "Fiskars is a leading Finnish brand known for its high-quality cutting tools and garden products. Founded in 1649, Fiskars has a long history of crafting innovative and durable cutting solutions. The company's iconic orange-handled scissors are recognized worldwide and have become a symbol of quality and precision. In addition to scissors, Fiskars offers a wide range of cutting tools, such as rotary cutters, craft knives, and paper trimmers. The brand's expertise in cutting technology has extended to other areas, including gardening tools like pruners, shears, and axes. With a commitment to design, functionality, and sustainability, Fiskars continues to be a trusted choice for crafting, sewing, gardening, and more.",
      url: "https://www.fiskars.com/",
      keywords:
        "Fiskars, cutting tools, scissors, rotary cutters, craft knives, paper trimmers, gardening tools",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=fiskars.com",
    },
    {
      title: "HP (Hewlett-Packard)",
      description:
        "HP (Hewlett-Packard) is a renowned American multinational information technology company. Founded in 1939, HP has a long history of innovation and technological advancements. The company offers a wide range of products and services, including personal computers, laptops, printers, monitors, and other computer peripherals. HP is recognized for its commitment to quality, reliability, and performance, making it a popular choice for both consumers and businesses. In addition to hardware, HP provides software solutions and services to support various industries and businesses. With a global presence and a focus on sustainability and social responsibility, HP continues to be a major player in the IT industry.",
      url: "https://www.hp.com/",
      keywords:
        "HP, Hewlett-Packard, computers, laptops, printers, computer peripherals, software solutions, IT industry",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=hp.com",
    },
    {
      title: "Jabra",
      description:
        "Jabra is a leading global brand that specializes in audio and communications solutions. Founded in 1983, Jabra has built a reputation for producing high-quality headsets, earbuds, and speakerphones. The company's products are designed for both personal and professional use, catering to consumers, businesses, and call centers. Jabra's audio solutions offer excellent sound quality, noise-cancellation, and ergonomic designs for comfortable and productive communication. With a focus on innovation and cutting-edge technology, Jabra continues to develop products that enhance communication and collaboration for individuals and organizations worldwide.",
      url: "https://www.jabra.com/",
      keywords:
        "Jabra, audio solutions, headsets, earbuds, speakerphones, communication, noise-cancellation",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=jabra.com",
    },
    {
      title: "Canon",
      description:
        "Canon is a leading Japanese multinational corporation that specializes in imaging and optical products. Founded in 1937, Canon has become one of the world's most recognized and trusted brands in the imaging industry. The company offers a wide range of products, including cameras, camcorders, printers, scanners, and binoculars. Canon's cameras are known for their exceptional image quality, advanced features, and user-friendly design, catering to both amateur photographers and professional videographers. Additionally, Canon's printers and scanners are popular choices for home and office use, offering reliable performance and high-quality output. With a commitment to innovation and environmental sustainability, Canon continues to be a dominant force in the imaging and optical technology market.",
      url: "https://www.canon.com/",
      keywords:
        "Canon, imaging products, cameras, camcorders, printers, scanners, optical technology",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=canon.com",
    },
    {
      title: "LEGO",
      description:
        "LEGO is a well-known Danish brand that specializes in manufacturing colorful plastic building blocks and construction toys. Founded in 1932, LEGO has become one of the most popular and iconic toy brands worldwide. The LEGO bricks are designed to interlock, allowing users to create a wide variety of structures, vehicles, and imaginative playsets. The brand's commitment to creativity, learning through play, and quality has made it a favorite among children and adults alike. LEGO sets cover various themes, including city life, space exploration, superheroes, and popular movie franchises. With a strong emphasis on innovation and environmental sustainability, LEGO continues to inspire creativity and imagination in generations of builders.",
      url: "https://www.lego.com/",
      keywords:
        "lego, building blocks, construction toys, creativity, imaginative play, lego sets",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=lego.com",
    },
    {
      title: "Razer",
      description:
        "Razer is a leading global lifestyle brand for gamers. Founded in 2005, Razer has become a prominent name in the gaming industry, known for producing high-performance gaming hardware and software. The company's product lineup includes gaming mice, keyboards, headsets, gaming laptops, and other gaming peripherals. Razer is renowned for its cutting-edge technology, ergonomic designs, and customizable features, catering to both casual and professional gamers. Additionally, Razer offers software solutions like Razer Synapse, which allows users to configure and optimize their gaming gear. With a strong focus on innovation, esports partnerships, and community engagement, Razer continues to be a preferred choice for gamers seeking top-notch gaming equipment.",
      url: "https://www.razer.com/",
      keywords:
        "Razer, gaming peripherals, gaming hardware, gaming laptops, gaming software, esports",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=razer.com",
    },
    {
      title: "Alienware",
      description:
        "Alienware is a well-known American brand specializing in high-performance gaming computers and hardware. Founded in 1996, Alienware has built a reputation for delivering powerful gaming laptops, desktops, and accessories tailored for gamers and enthusiasts. The brand is recognized for its futuristic designs, top-notch performance, and advanced cooling solutions to handle intense gaming sessions. Alienware products often feature cutting-edge technology, such as high-refresh-rate displays and NVIDIA GeForce RTX graphics cards, to provide an immersive gaming experience. With a focus on gaming innovation and customization, Alienware continues to be a popular choice for gamers looking to elevate their gaming performance.",
      url: "https://www.dell.com/en-us/gaming/alienware",
      keywords:
        "Alienware, gaming computers, gaming laptops, high-performance hardware, gaming accessories, gaming innovation",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=dell.com",
    },
    {
      title: "Lenovo",
      description:
        "Lenovo is a leading global technology company based in China. Founded in 1984, Lenovo has become one of the world's largest and most renowned manufacturers of personal computers, laptops, tablets, smartphones, and other electronic devices. The brand is known for its diverse product lineup, catering to various consumer and business needs. Lenovo's laptops and computers are recognized for their performance, reliability, and innovative features, making them a preferred choice for both individuals and businesses. Additionally, Lenovo offers a wide range of mobile devices, including smartphones and tablets, known for their sleek design and user-friendly interfaces. With a commitment to innovation, quality, and customer satisfaction, Lenovo continues to be a prominent player in the global technology market.",
      url: "https://www.lenovo.com/",
      keywords:
        "Lenovo, personal computers, laptops, tablets, smartphones, electronic devices, technology",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=lenovo.com",
    },
    {
      title: "Casio",
      description:
        "Casio is a renowned Japanese multinational electronics company. Founded in 1946, Casio has become a leading brand in the electronics industry, known for its diverse range of products. The company's product lineup includes calculators, digital watches, electronic musical instruments, cameras, and more. Casio is particularly famous for its digital watches, with iconic models like G-Shock and Baby-G known for their durability and rugged design. Casio's calculators and electronic musical instruments are also popular choices for students, professionals, and musicians. With a focus on innovation and reliability, Casio continues to offer cutting-edge technology and high-quality products to consumers worldwide.",
      url: "https://www.casio.com/",
      keywords:
        "Casio, electronics, calculators, digital watches, electronic musical instruments",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=casio.com",
    },
    {
      title: "Nokia",
      description:
        "Nokia is a Finnish multinational telecommunications, information technology, and consumer electronics company. Founded in 1865, Nokia has a long history and has undergone various transformations over the years. It was once a prominent mobile phone manufacturer and a pioneer in the mobile phone industry. Nokia's phones were known for their durability, user-friendly design, and innovative features. However, with the rise of smartphones, Nokia shifted its focus to network infrastructure and other technology ventures. Today, Nokia is a major player in the telecommunications industry, providing network equipment and solutions for communication service providers and enterprises. The company also offers digital health products and consumer electronics, including smartphones under licensing partnerships.",
      url: "https://www.nokia.com/",
      keywords:
        "Nokia, telecommunications, mobile phones, network infrastructure, digital health, consumer electronics",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=nokia.com",
    },
    {
      title: "Messenger",
      description:
        "Messenger is a popular messaging app developed by Facebook. It allows users to send messages, make voice and video calls, and share media with friends and contacts. Messenger offers a wide range of features, including stickers, reactions, group chats, and various interactive tools. It is available on various platforms, including smartphones and desktops, making it easy for users to stay connected no matter where they are. Messenger is widely used for personal communication, but it also has features for connecting with businesses, enabling customer support and interaction with brands. With a large user base and seamless integration with Facebook's ecosystem, Messenger remains one of the most widely used messaging apps globally.",
      url: "https://www.messenger.com/",
      keywords:
        "Messenger, messaging app, voice calls, video calls, group chats, stickers, customer support",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=messenger.com",
    },
    {
      title: "VK (VKontakte)",
      description:
        "VK (VKontakte) is a popular social networking platform based in Russia. Founded in 2006, VK is one of the largest social media platforms in the country, with millions of active users. It offers a wide range of features, including personal profiles, news feeds, photo sharing, messaging, and community groups. VK is known for its vibrant music and video features, allowing users to discover and share music, as well as watch and upload videos. The platform also supports various applications and games, adding to its entertainment value. VK has become a prominent platform for social interaction, content sharing, and cultural exchange in Russia and some other countries with Russian-speaking communities.",
      url: "https://vk.com/",
      keywords:
        "VK, VKontakte, social networking, Russia, music sharing, video sharing",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=vk.com",
    },
    {
      title: "LINE",
      description:
        "LINE is a popular messaging app and social media platform developed by the Japanese company LINE Corporation. Launched in 2011, LINE has become one of the leading communication apps in many Asian countries and beyond. The app allows users to send messages, make voice and video calls, share photos and videos, and create and join group chats. LINE also offers a wide range of stickers and emojis, enhancing the messaging experience. In addition to messaging, LINE provides various services, including news, games, digital payments, and a timeline feature where users can share updates and posts with their friends. With its user-friendly interface and diverse features, LINE remains a favored choice for social communication and content sharing.",
      url: "https://www.line.me/",
      keywords:
        "LINE, messaging app, voice calls, video calls, stickers, social media, digital payments",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=line.me",
    },
    {
      title: "Sunbeam",
      description:
        "Sunbeam is a well-known brand that specializes in home appliances and consumer products. Founded in 1897, Sunbeam has a long history of providing innovative and reliable products for households worldwide. The brand's product lineup includes kitchen appliances like coffee makers, blenders, toasters, and mixers, as well as other household items such as bedding, heating pads, and irons. Sunbeam is recognized for its focus on practicality, functionality, and affordability, making its products accessible to a wide range of consumers. With a legacy of providing quality home solutions, Sunbeam continues to be a trusted choice for everyday appliances and household essentials.",
      url: "https://www.sunbeam.com/",
      keywords:
        "Sunbeam, home appliances, kitchen appliances, household products, bedding, heating pads, irons",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=sunbeam.com",
    },
    {
      title: "Target",
      description:
        "Buy Online, Pick Up In-Store — Order Today, Get It Fast. Enjoy Free Shipping When You Spend $35 or Use Your RedCard™. Enjoy Low Prices On Groceries, Home, Electronics, Apparel & More – Shop Now!",
      url: "https://www.target.com/",
      keywords:
        "Target, Shopping, Shop, Store, Cart, Trending, Online Shopping",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=target.com",
    },
    {
      title: "Walmart",
      description:
        "Save money, Live better.",
      url: "https://www.walmart.com/",
      keywords:
        "Shopping, Shop, Store, Cart, Trending, Walmart, Online Shopping",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=walmart.com",
    },
        {
      title: "Target VS Walmart",
      description:
        "Target is a fancier version of walmart. It looks better, is often more clean then Walmart, it is usally less loud than Walmart, and has many different things. On the other hand, Walmart has less stuff and is often more loud. But Walmart also often has great bargains. It depends on what you need is.",
      url: "",
      keywords:
        "Shopping, Shop, Store, Cart, Trending, Walmart vs Target, Online Shopping",
      icon: "",
    },
    {
      title: "Vans",
      description:
        "Shop at Vans.com for Shoes, Clothing & Accessories. Browse Men's, Women's, Kids & Infant Styles. Get Free Shipping & Free Returns 24/7!",
      url: "https://www.vans.com/",
      keywords: "Shoes, Shop, Store, Cart, Trending, Vans, Online Shopping",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=Vans.com",
    },
    {
      title: "Never Gonna Give You Up",
      description: "We're no strangers to love",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      keywords: "Rickroll, Trending, Never gonna give you up, Rick astley",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=Youtube.com",
      domainName: "YouTube",
    },
    {
      title: "What is a turtle?",
      description:
        "Any land or marine reptile of the order Testudines, characterised by a protective shell enclosing its body",
      url: "",
      keywords: "Turtles, What is a turtle, Search, Question, What is, Reptile",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=turtlewave-browser.glitch.me",
    },
    {
      title: "What is a reptile?",
      description: "A cold-blooded vertebrate of the class Reptilia.",
      url: "",
      keywords: "Reptile, What is a reptile, Search, Question, What is",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=turtlewave-browser.glitch.me",
    },
        {
      title: "Akinator",
      description:
        "Akinator can read your mind and tell you what character you are thinking of, as if by magic.",
      url: "https://en.akinator.com/",
      keywords:
        "mind reader, genie, akinator, games",
      icon: "https://en.akinator.com/assets/img/favicon-2022-Akinator-48x48.png",
    },
    {
      title: "TurtleWave Browser Pages",
      description: "Error",
      url: "turtlewave-pages",
      keywords:
        "",
      icon: "https://cdn.glitch.global/d91692f2-cf09-42f3-a92e-2f88ff8935e0/Help?v=1695257264794",
    },
    {
      title: "Where did the name Lego come from?",
      description:
        "The name 'LEGO' is an abbreviation of the two Danish words “leg godt”, meaning “play well”.",
      url: "https://www.lego.com/en-us/aboutus/lego-group/the-lego-group-history",
      keywords: "where did the name lego come from",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=lego.com",
    },
                                                                {
        title: "Show results for [Q] on Google",
      description:
        "Search Google for your search query",
      url: "&searchOnLink=google",
      keywords: "on google, google, !app=google",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=google.com",
      engine: "Google",
    },
                                                {
      title: "Microsoft Store | Xbox",
      description:
        "Get apps, games, and more for your Xbox device.",
      url: "https://www.xbox.com/games/browse",
      keywords:
        "xbox, microsoft store",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://xbox.com",
    },
                                        {
      title: "Microsoft Store | Windows",
      description:
        "Get apps, games, and more for your Windows device.",
      url: "https://apps.microsoft.com/home",
      keywords:
        "windows, microsoft store",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://apps.microsoft.com",
    },
                                    {
      title: "Dog.com",
      description: "Shopping for your pet has never been easier. From crates and carriers to collars and leashes, Dog.com is your one stop shop for all your dog supply needs.",
      url: "https://www.dog.com",
      keywords:"dogs, dog",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.dog.com",
    },
                                                        {
      title: "Hidden-Netflix Codes",
      description: "Find hidden Netflix pages",
      url: "https://www.netflix-codes.com",
      keywords:"netflix hidden, netflix codes",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://www.netflix-codes.com",
    },
                                                          {
      title: "Are you a robot?",
      description: "No robots allowed!",
      url: "https://no-robots.glitch.me",
      keywords:"robot test, are you a robot, am i a robot, human test, no robots, no-robots, robo verify",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=https://no-robots.glitch.me"
    },
    {
      title: "WhatsApp",
      description: "Use WhatsApp Messenger to stay in touch with friends and family.",
      url: "https://www.whatsapp.com",
      keywords: "whatsapp, social media",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com"
    },
                   {
      title: "Messenger",
      description: "Messenger is a free messaging app that helps you connect with anyone, anywhere.",
      url: "https://www.messenger.com",
      keywords: "messenger",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=messenger.com"
    },
                       {
      title: "NAVER",
      description: "네이버 모바일 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
      url: "https://www.naver.com",
      keywords: "naver, search engine",
      icon: "https://www.google.com/s2/favicons?sz=64&domain=naver.com"
    }
  ],
};

const searchResult = findObjectsByKeyword(searchquery, dataJSON);
if (searchResult) {
  console.log("Objects found:");

  for (const { object, index } of searchResult) {
    console.log(`- Object at index ${index}:`);
    console.log(object);
    document.getElementById("found").innerHTML =
      "entries found that match: true";
  }
} else {
  console.log("No objects found.");
  document.getElementById("found").innerHTML =
    "entries found that match: false";
}

async function fillresults(keyword) {
  if (!keyword.trim() || /^[,\s]+$/.test(keyword)) {
    document.getElementById("query").textContent =
      "Please enter a valid search query.";
    document.getElementById("found").textContent = "";
    document.getElementById("results").innerHTML = "";
    return;
  }

  const resultscontainer = document.getElementById("results");
  const resultdivtemplate = document.getElementById("result-div");
  const resultdivs = document.querySelectorAll(".result-div:not(#result-div)");
  resultdivs.forEach((div) => div.remove());
  const searchresult = findObjectsByKeyword(keyword, dataJSON);

  const existingurls = [];

  if (searchresult) {
    for (const { object } of searchresult) {
      const clone = resultdivtemplate.cloneNode(true);
      clone.removeAttribute("id");

      if (object.disclude) {
        const keywordstodisclude = object.disclude
          .split(", ")
          .map((k) => k.toLowerCase());
        if (keywordstodisclude.includes(keyword.toLowerCase())) {
          clone.style.display = "none";
        }
      }

      if (object.engine) {
        clone.querySelector("#link").href = "/search?query=" + keyword + object.url;
        clone.querySelector("#link").textContent = "Search " + object.engine + " for: " + keyword;
      } else if (object.domainName) {
        clone.querySelector("#link").textContent = object.domainName + " | " + object.title;
        clone.querySelector("#link").href = object.url;
      } else {
        if (object.flagged) {
          clone.querySelector("#link").href = "/rare-errors/leaving-turtlewave/notsafe.html?goto=" + encodeURI(object.url);
        } else {
          clone.querySelector("#link").href = object.url;
        }
        clone.querySelector("#link").textContent = object.title;
      }

      clone.querySelector("#url-label").textContent = object.url;
      clone.querySelector("#desc-label").textContent = object.description;

      if (object.subpages) {
        clone.querySelector("#subpages-label").innerHTML =
          "<strong style='color:black'> More: </strong>" + getSubpages(object.subpages, object.url);
      } else {
        const sublabel = clone.querySelector("#subpages-label");
        if (sublabel) sublabel.remove();
      }

      const iconimg = clone.querySelector("#icon");
      iconimg.src = object.icon;

      resultscontainer.appendChild(clone);

      existingurls.push(object.url);
    }
    document.getElementById("found").textContent = `${searchresult.length} result(s) found`;
  } else {
    document.getElementById("found").textContent =
      "No websites found. Did you place capitals in the right places?";
  }
  try {
    const res = await fetch(`/.netlify/functions/secondaryresults?q=${encodeURIComponent(keyword)}`);
    const duckurls = await res.json();

      const filteredurls = duckurls.filter(
          (url) => !existingurls.some(eu => eu.replace(/\/$/, '') === url.replace(/\/$/, ''))
      );


    filteredurls.forEach((url) => {
      const clone = resultdivtemplate.cloneNode(true);
      clone.removeAttribute("id");

      clone.querySelector("#link").href = url;
      clone.querySelector("#link").textContent = url;
      clone.querySelector("#url-label").textContent = url;
      clone.querySelector("#desc-label").textContent = "DuckDuckGo result";
    
      const iconimg = clone.querySelector("#icon");
      iconimg.src = "https://www.google.com/s2/favicons?sz=64&domain=" + new URL(url).hostname;

      resultscontainer.appendChild(clone);
    });
  } catch (err) {
    console.error(":( secondary results fetch error:", err);
  }
}

fillresults(searchquery);
document.addEventListener("DOMContentLoaded", function () {
  const originalResultDiv = document.getElementById("result-div");
  originalResultDiv.style.display = "none";
});
