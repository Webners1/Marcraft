import mock from './mock';
import './notes/NotesData';
import './chat/Chatdata';
import './email/EmailData';
import './ticket/TicketData';
import './contacts/ContactsData';
import './influencer/ProductsData';
import './userprofile/PostData';
import './userprofile/UsersData';
import './blog/blogData';

mock.onAny().passThrough();
