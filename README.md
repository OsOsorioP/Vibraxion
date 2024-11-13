# Vibraxion

### Key Features:
Spotify API Integration:

- Music Playback: Users can listen to music in real-time via their Spotify account, selecting their favorite songs, playlists, or albums.

- Basic Controls: Participants can play, pause, and skip songs in the room.

- Room Creation and Management: Users can create a new music room, where they can invite others to join. The app generates a unique link for each room, which users can share with friends or others to join the session.

- Join Rooms: Users can join existing rooms via the link provided by the room creator.
Once inside, participants can interact with other members and share control over the music.

- Voting to Skip or Pause Songs: All room members can vote to skip a song, change to a new one, or pause the ongoing music.
The voting system ensures that decisions are made democratically, fostering interaction among users.
Collaborative User Interface:

- Live Chat: Users can interact through a live chat while listening to music together.

- Shared Playlist: Users can view and add songs to the shared queue, enabling collaboration in song selection.

- Room Host Controls: The room creator has additional privileges to manage the music session, such as deciding when to end the session or remove participants if necessary.

- Real-Time Synchronization: All actions, such as playing, pausing, or skipping songs, are synchronized in real time across all participants in the room, ensuring everyone is listening to the same song at the same time.

### Usage Flow:
Create a Room: A user creates a room and gives it a name. The app generates a unique link for inviting others.
Join the Room: Other users join the room via the link. If they haven't logged into Spotify, they will be prompted to do so in order to enjoy the music.
Interaction in the Room: Users can interact through live chat and add songs to the shared playlist.
Voting: If someone wants to skip a song or pause the music, members can vote. If the majority agrees, the action is carried out.
End the Session: When the session ends, the room creator can close the room or allow participants to stay listening to music individually.
### Technologies Used:
Frontend: React for the user interface, with Material UI for components and layout.
Backend: Spring Boot (or any compatible backend), to manage rooms, voting, and logic for the external API.
Spotify API: For music streaming and managing users' libraries.
Room Management API: A custom API to handle music rooms, synchronize user actions, and manage voting.

### Use Cases:
Virtual Parties: A group of friends can gather to listen to music together, as if they were at a party, even if each is in a different location.
Shared Study Sessions: Users can use Vibraxion to create a collaborative music environment while studying or working together.
Live Events: Event hosts can create a room for attendees to listen to the same music at the same time, providing an interactive experience.

Vibraxion not only allows music listening but also creates a social experience where users can actively participate in managing the music, making it a unique platform for enjoying music together.
