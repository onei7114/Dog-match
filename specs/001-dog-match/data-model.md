# Data Model: Dog Match

## Primary Entities

### UploadRequest

Represents the user action of selecting or dropping a dog photo.

Properties:
- source: file or drag-and-drop input
- fileName: original file name
- mimeType: image MIME type
- sizeBytes: file size
- isSupported: boolean validation result

### BreedMatchResult

Represents the current match shown to the user.

Properties:
- breedName: string
- confidenceLabel: low, medium, high, or equivalent
- matchPercentage: number or textual approximation
- summaryText: explanation of typical breed traits
- uncertaintyMessage: honest wording clarifying that the result is a likely match

### BreedProfile

Represents a breed’s generic tendencies used in the result card.

Properties:
- breedName: string
- energyRating: 1-5
- childFriendlyRating: 1-5
- groomingRating: 1-5
- description: friendly summary
- imageUrl: attribution-safe asset source

### SavedFavorite

Represents a user-saved breed.

Properties:
- breedName: string
- savedAt: timestamp
- isActive: boolean

## Relationships

- One UploadRequest produces zero or one BreedMatchResult.
- One BreedMatchResult references one BreedProfile.
- One user can save zero or many SavedFavorite entries.
- The popular breeds section acts as a curated set of BreedProfile records for comparison and exploration.
