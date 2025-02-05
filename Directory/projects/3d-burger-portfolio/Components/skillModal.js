function createModal(title, whatIDid, mediaUrl, urls = {}) {
  const { youtube, github, tiktok, facebook, linkedin, browser } = urls;

  // Create the modal container
  const modal = document.createElement('div');
  modal.id = 'myModal';
  modal.style.display = 'none';
  modal.style.position = 'fixed';
  modal.style.zIndex = '2';
  modal.style.left = '50%';
  modal.style.top = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.width = '90%';
  modal.style.maxWidth = '800px';
  modal.style.height = '90%';
  modal.style.fontFamily = 'myCustomFont';
  modal.style.backgroundColor = '#141414';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
  modal.style.border = '2px solid white';
  modal.style.overflow = 'hidden';

  const modalContent = document.createElement('div');
  modalContent.style.padding = '20px';
  modalContent.style.overflow = 'hidden';
  modal.appendChild(modalContent);

  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '10px';
  closeBtn.style.right = '20px';
  closeBtn.style.fontSize = '30px';
  closeBtn.style.fontWeight = 'bold';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.color = 'white';
  modal.appendChild(closeBtn);

  closeBtn.onclick = () => {
    modal.style.display = 'none';
    document.body.removeChild(modal);
  };

  const modalTitle = document.createElement('h2');
  modalTitle.innerText = title;
  modalTitle.style.marginBottom = '10px';
  modalTitle.style.color = '#ffcc00';
  modalContent.appendChild(modalTitle);

  // https://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
  if (mediaUrl) {
    const extension = mediaUrl.split('.').pop().toLowerCase();
    if (['mp4', 'webm', 'ogg'].includes(extension)) {
      const modalVideo = document.createElement('video');
      modalVideo.src = mediaUrl;
      modalVideo.controls = true;
      modalVideo.style.display = 'block';
      modalVideo.style.margin = '0 auto 10px';
      modalVideo.style.width = '200px';
      modalVideo.style.height = '200px';
      modalContent.appendChild(modalVideo);
    } else {
      const modalImage = document.createElement('img');
      modalImage.src = mediaUrl;
      modalImage.alt = title;
      modalImage.style.display = 'block';
      modalImage.style.margin = '0 auto 10px';
      modalImage.style.width = '100%';
      modalImage.style.height = '200px';
      modalImage.style.objectFit = 'contain';
      modalContent.appendChild(modalImage);
    }
  }

  const whatIDidTitle = document.createElement('h2');
  whatIDidTitle.innerText = 'What I Did:';
  whatIDidTitle.style.marginBottom = '5px';
  whatIDidTitle.style.color = '#ffcc00';
  modalContent.appendChild(whatIDidTitle);

  const whatIDidContent = document.createElement('p');
  whatIDidContent.innerText = whatIDid;
  whatIDidContent.style.marginBottom = '10px';
  whatIDidContent.style.color = 'white';
  modalContent.appendChild(whatIDidContent);

  if (Object.values(urls).some(Boolean)) {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '20px';
    buttonContainer.style.textAlign = 'center';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';

    const createButton = (url, text, bgColor) => {
      const button = document.createElement('a');
      button.href = url;
      button.target = '_blank';
      button.style.backgroundColor = bgColor;
      button.style.color = 'white';
      button.style.padding = '10px 20px';
      button.style.margin = '0 10px';
      button.style.textDecoration = 'none';
      button.style.borderRadius = '5px';
      button.innerText = text;
      return button;
    };

    if (youtube) buttonContainer.appendChild(createButton(youtube, 'View on YouTube', '#ff0000'));
    if (github) buttonContainer.appendChild(createButton(github, 'View on GitHub', '#333'));
    if (tiktok) buttonContainer.appendChild(createButton(tiktok, 'View on TikTok', 'purple'));
    if (facebook) buttonContainer.appendChild(createButton(facebook, 'View on Facebook', 'blue'));
    if (linkedin) buttonContainer.appendChild(createButton(linkedin, 'View on LinkedIn', 'blue'));
    if (browser) buttonContainer.appendChild(createButton(browser, 'View on Browser', 'red'));

    modalContent.appendChild(buttonContainer);
  }

  document.body.appendChild(modal);
  modal.style.display = 'block';
}


export function showReactJS() {
  createModal(
    'Game To Get Customer Emails',
    "Developed a POPCAT minigame clone for our client. Worked closely with the client’s marketing team. In just 7 days, we gained 1188 user emails and hit 191.2 million pops, surpassing the 500-user leads KPI by 237%. ",
    './assets/programming/popnik.jpg'
  );
}

export function showJavascript() {
  createModal(
    'Perlin Noise Visualisation',
    "To simulate the natural movement of waves, I played with the Perlin Noise Algorithm and added a slider to show how different resolutions created different results.",
    './assets/programming/perlinwave.mp4',
    {
      github: 'https://github.com/Jodistroyer/UAL-CCI-Creative-Coding-p5js-Perlin-Noise-Waves'
    }
  );
}

export function showPython() {
  createModal(
    'Facetracking Laser Robot with AI',
    "Using Python and an Arduino, made a Robot that Shines Lasers at people's Faces.",
    './assets/programming/facetracking.png',
    {
    youtube:'https://youtu.be/RW5ZLQVx7Hc',
    github: 'https://github.com/Jodistroyer/UAL-CCI-CM-Machine-Vision-Arduino-Laser'
    }
  );
}

export function showCorporate() {
  createModal(
    'Culture-Driven Branding',
    "Created a Culture-Driven Recruitment and Client Acquisition video for a Marketing Firm.",
    './assets/videography/corporate.jpg',
    {
    youtube: 'https://www.youtube.com/watch?v=gIhKbU2ansQ',
    }
  );
}

export function showTikTok() {
  createModal(
    'Fintech Company Branding',
    "Boosted brand reputation by producing 30+ TikTok videos featuring top financial experts within seven weeks.",
    './assets/videography/tiktok.png',
    {
      tiktok: 'https://www.tiktok.com/@cofundr'
    }
  );
}

export function showSales() {
  createModal(
    'Sentiment Testing',
    "Made Short Videos To Decide which Products were Worth Selling. Test was Successful as we sold Several Hundreds of our Champion Products within 7 days of sales.",
    './assets/videography/sales.jpg',
    {
    facebook: 'https://www.facebook.com/reel/768936544601434'
    }
  );
}

export function showBanking() {
  createModal(
    'Casestudy Champion',
    "Led a team of four to develop a structured solution framework for a case study and earned an internship offer from CIMB for exceptional performance.",
    './assets/tactical/banking.jpg',
    {
      linkedin: 'https://www.linkedin.com/posts/jo-hann-wong-164510225_thank-you-cimb-for-a-great-time-at-the-activity-7228419740929531904-EP72?utm_source=share&utm_medium=member_desktop'
     }
    );
}

export function showCopywriting() {
  createModal(
    'Copywriting For Global Fabric Company',
    "Created weekly informative articles for a leading textile distributor, focusing on premium product offerings and global partnerships. This enhanced brand recognition and positioned the distributor as a trusted industry leader.",
    './assets/communication/copywriting.jpg',
    {
      browser: 'https://acaciasofa.co/index.php/fr-one-fire-retardant-fabrics-are-beyond-your-wildest-emaargination/'
    }
  );
}

export function showPresentation() {
  createModal(
    'Presentation Designer for Wealth Management Firm',
    "Improved the Estate Planning Sales Deck for Quarters Malaysia by creating clear visuals and sharpening the messaging to better highlight the firm’s value to clients. This helped make client pitches more engaging and effective.",
    './assets/communication/presentation.jpg'
  );
}

export function showPlasticManufacturer() {
  createModal(
    'Plastics Manufacturing Company',
    "Provided actionable recommendations for the launch of a new B2C zip-lock line by conducting in-depth market research, competitor analysis, and consumer surveys.",
    './assets/tactical/plastic.png',
    {
      facebook: 'https://www.facebook.com/Spsplas/'
    }
  );
}

export function showLightingManufacturer() {
  createModal(
    'Lighting Equipment Manufacturing Company',
    "Developed strategic insights through market research, competitor analysis, and consumer surveys, enabling the successful launch of a new anti-bacterial downlight product line.",
    './assets/tactical/lighting.png',
    {
      browser: 'https://www.evergrown.com/'
    }
  );
}

export function showBasePrinciple() {
  createModal(
    'My Base Principle',
    "Each project starts with a sturdy base. Understanding the problem (Solve), crafting a compelling message (Tell), and delivering results that resonate (Sell).",
    './assets/principle/principle.png',
  );
}

export function showLumbermart() {
  createModal(
    'Wood Flooring Brand',
    "Crafted engaging ads for a top timber flooring provider, showcasing durability and value to boost brand trust and recognition.",
    './assets/dynamic/lumbermart.png',
    {
      linkedin: 'https://www.linkedin.com/posts/jo-hann-wong-164510225_two-of-my-favorite-ads-that-i-made-for-lumbermart-activity-7207089722211348480-oDMu?utm_source=share&utm_medium=member_desktop'
    }
  );
}

export function showBackley() {
  createModal(
    'Homeware Brand',
    "Created engaging ads for a top wood homeware brand, highlighting the versatality of their unique serving platters.",
    './assets/dynamic/backley.jpg',
    {
      facebook: 'https://www.facebook.com/photo.php?fbid=703946578408045&set=pb.100063781260755.-2207520000&type=3'
    }
  );
}