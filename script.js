const fileInput = document.querySelector('#fileInput');
const browseButton = document.querySelector('#browseButton');
const dropZone = document.querySelector('#dropZone');
const resultPhoto = document.querySelector('#resultPhoto');
const resultHeading = document.querySelector('#result-heading');
const resultBreed = document.querySelector('#breedName');
const toast = document.querySelector('#toast');
const matchBadge = document.querySelector('#matchBadge');
const breedLocation = document.querySelector('#breedLocation');
const confidenceLabel = document.querySelector('#confidenceLabel');
const resultDescription = document.querySelector('#resultDescription');
const energyValue = document.querySelector('#energyValue');
const childValue = document.querySelector('#childValue');
const groomingValue = document.querySelector('#groomingValue');
const energyBar = document.querySelector('#energyBar');
const childBar = document.querySelector('#childBar');
const groomingBar = document.querySelector('#groomingBar');
const heartButton = document.querySelector('.heart-button');
const detailsButton = document.querySelector('#detailsButton');

const breedProfiles = {
  'Golden Retriever': {
    name: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000&q=85',
    matchBadge: 'Likely match',
    confidenceLabel: 'Likely match',
    confidenceDots: '● ● ● ● ○',
    location: 'warm, social energy',
    description: 'Friendly, devoted, and usually ready for an adventure. This match suggests a cheerful, people-oriented pup with a strong social streak.',
    uncertainty: 'The result is a likely breed guess, not a guarantee about one dog’s personality or behavior.',
    energy: 4,
    childFriendly: 5,
    grooming: 3,
  },
  'Labrador Retriever': {
    name: 'Labrador Retriever',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800&q=85',
    matchBadge: 'Likely match',
    confidenceLabel: 'Likely match',
    confidenceDots: '● ● ● ● ○',
    location: 'playful, people-loving charm',
    description: 'Labradors are often outgoing, athletic, and eager to be part of the action. Their playful energy tends to make them a favorite for active households.',
    uncertainty: 'Breed tendencies are helpful clues, but every dog has individual quirks and personality.',
    energy: 5,
    childFriendly: 5,
    grooming: 2,
  },
  'Cavalier King Charles': {
    name: 'Cavalier King Charles',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=85',
    matchBadge: 'Good match',
    confidenceLabel: 'Good match',
    confidenceDots: '● ● ● ○ ○',
    location: 'gentle, affectionate companionship',
    description: 'A sweet, affectionate companion with a calm temperament and a natural love of couch time. They often feel happiest close to their people.',
    uncertainty: 'This is a best estimate based on broad breed tendencies, not a certainty about one dog’s traits.',
    energy: 3,
    childFriendly: 5,
    grooming: 4,
  },
  'French Bulldog': {
    name: 'French Bulldog',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=85',
    matchBadge: 'Strong clue',
    confidenceLabel: 'Strong clue',
    confidenceDots: '● ● ● ● ○',
    location: 'easygoing, comic energy',
    description: 'French Bulldogs are frequently known for being charming, compact, and adaptable. Their goofy personality often wins people over quickly.',
    uncertainty: 'A breed guess can point in the right direction, but individual dogs still vary in personality and health.',
    energy: 3,
    childFriendly: 4,
    grooming: 2,
  },
  'Bernese Mountain Dog': {
    name: 'Bernese Mountain Dog',
    image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=85',
    matchBadge: 'Likely match',
    confidenceLabel: 'Likely match',
    confidenceDots: '● ● ● ○ ○',
    location: 'steady, family-friendly presence',
    description: 'Bernese Mountain Dogs are often described as gentle, steady, and eager to be included in family life. They tend to thrive with consistent companionship and room to roam.',
    uncertainty: 'This result is a likely breed match, and the ratings reflect general tendencies rather than guaranteed behavior.',
    energy: 3,
    childFriendly: 5,
    grooming: 5,
  },
};

const state = {
  selectedProfile: breedProfiles['Golden Retriever'],
  savedBreeds: new Set(),
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

function setTraitBar(element, value) {
  element.style.width = `${(value / 5) * 100}%`;
}

function renderBreedProfile(profile, imageUrl, options = {}) {
  const { customHeading = null, isUploaded = false } = options;
  const firstName = profile.name.split(' ')[0];

  state.selectedProfile = profile;
  resultPhoto.src = imageUrl || profile.image;
  resultPhoto.alt = `${profile.name} dog`;
  resultHeading.innerHTML = customHeading || `Meet <em>${isUploaded ? 'your pup' : firstName}</em>`;
  resultBreed.textContent = profile.name;
  matchBadge.textContent = profile.matchBadge;
  breedLocation.textContent = `♡ Best known for: ${profile.location}`;
  confidenceLabel.innerHTML = `${profile.confidenceLabel}<br /><b>${profile.confidenceDots}</b>`;
  resultDescription.textContent = `${profile.description} ${profile.uncertainty}`;
  energyValue.textContent = `${profile.energy} / 5`;
  childValue.textContent = `${profile.childFriendly} / 5`;
  groomingValue.textContent = `${profile.grooming} / 5`;
  setTraitBar(energyBar, profile.energy);
  setTraitBar(childBar, profile.childFriendly);
  setTraitBar(groomingBar, profile.grooming);
  detailsButton.innerHTML = `Explore ${profile.name} <span>→</span>`;

  if (heartButton) {
    const isSaved = state.savedBreeds.has(profile.name);
    heartButton.classList.toggle('saved', isSaved);
    heartButton.setAttribute('aria-pressed', String(isSaved));
    heartButton.textContent = isSaved ? '♥' : '♡';
    heartButton.setAttribute('aria-label', isSaved ? `Remove ${profile.name} from favorites` : `Save ${profile.name}`);
  }
}

function chooseRandomProfile() {
  const profiles = Object.values(breedProfiles);
  return profiles[Math.floor(Math.random() * profiles.length)];
}

function previewFile(file) {
  if (!file) {
    showToast('Please choose a JPG, PNG, or WEBP image.');
    return;
  }

  const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
  if (!isValidType) {
    showToast('Please choose a JPG, PNG, or WEBP image.');
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    showToast('That image is over 10 MB. Try a smaller photo.');
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const profile = chooseRandomProfile();
    renderBreedProfile(profile, reader.result, { customHeading: 'Meet <em>your pup</em>', isUploaded: true });
    showToast('Photo added. Your match is ready to explore.');
    document.querySelector('.result-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  reader.addEventListener('error', () => {
    showToast('That image could not be read. Please try another photo.');
  });

  reader.readAsDataURL(file);
}

browseButton.addEventListener('click', (event) => {
  event.stopPropagation();
  fileInput.click();
});

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    fileInput.click();
  }
});
fileInput.addEventListener('change', (event) => previewFile(event.target.files[0]));

['dragenter', 'dragover'].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add('dragging');
  });
});

['dragleave', 'drop'].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove('dragging');
  });
});

dropZone.addEventListener('drop', (event) => previewFile(event.dataTransfer.files[0]));

document.querySelectorAll('.breed-card').forEach((card) => {
  card.addEventListener('click', () => {
    const breed = card.dataset.breed;
    const profile = breedProfiles[breed];
    if (!profile) return;
    renderBreedProfile(profile, card.dataset.image, { customHeading: `Meet <em>${breed.split(' ')[0]}</em>` });
    showToast(`${breed} details are now in your match.`);
    document.querySelector('.result-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

heartButton.addEventListener('click', () => {
  const breedName = state.selectedProfile.name;
  const isSaved = state.savedBreeds.has(breedName);

  if (isSaved) {
    state.savedBreeds.delete(breedName);
    showToast(`${breedName} removed from favorites.`);
  } else {
    state.savedBreeds.add(breedName);
    showToast(`${breedName} saved to your favorites.`);
  }

  heartButton.classList.toggle('saved', !isSaved);
  heartButton.setAttribute('aria-pressed', String(!isSaved));
  heartButton.textContent = !isSaved ? '♥' : '♡';
  heartButton.setAttribute('aria-label', !isSaved ? `Remove ${breedName} from favorites` : `Save ${breedName}`);
});

renderBreedProfile(state.selectedProfile, state.selectedProfile.image);
