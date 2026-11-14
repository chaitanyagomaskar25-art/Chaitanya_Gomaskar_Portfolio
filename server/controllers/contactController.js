import { Contact } from '../models/Contact.js';
import { isConnectedToMongo, fallbackStore, saveFallbackStore } from '../config/db.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'A valid email address is required' });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters long' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const contactData = {
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : 'Portfolio Contact Inquiry',
      message: message.trim(),
      status: 'unread',
      ip,
      createdAt: new Date().toISOString()
    };

    let saved;
    if (isConnectedToMongo) {
      saved = await Contact.create(contactData);
    } else {
      const newContact = {
        _id: 'msg-' + Date.now(),
        ...contactData
      };
      fallbackStore.contacts.unshift(newContact);
      fallbackStore.analytics.contactSubmissions = (fallbackStore.analytics.contactSubmissions || 0) + 1;
      saveFallbackStore();
      saved = newContact;
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received and saved successfully.',
      data: saved
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ success: false, message: 'Server error processing your message.' });
  }
};

export const getContacts = async (req, res) => {
  try {
    const adminPass = process.env.ADMIN_PASSCODE || 'admin123';
    const providedKey = req.headers['x-admin-key'] || req.query.adminKey;

    if (providedKey !== adminPass) {
      return res.status(401).json({ success: false, message: 'Unauthorized. Admin passcode required.' });
    }

    if (isConnectedToMongo) {
      const messages = await Contact.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    } else {
      return res.json({ success: true, count: fallbackStore.contacts.length, data: fallbackStore.contacts });
    }
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving messages.' });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const adminPass = process.env.ADMIN_PASSCODE || 'admin123';
    const providedKey = req.headers['x-admin-key'] || req.query.adminKey;

    if (providedKey !== adminPass) {
      return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    if (isConnectedToMongo) {
      const updated = await Contact.findByIdAndUpdate(id, { status }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Message not found' });
      return res.json({ success: true, data: updated });
    } else {
      const item = fallbackStore.contacts.find((c) => c._id === id);
      if (!item) return res.status(404).json({ success: false, message: 'Message not found' });
      item.status = status;
      saveFallbackStore();
      return res.json({ success: true, data: item });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const adminPass = process.env.ADMIN_PASSCODE || 'admin123';
    const providedKey = req.headers['x-admin-key'] || req.query.adminKey;

    if (providedKey !== adminPass) {
      return res.status(401).json({ success: false, message: 'Unauthorized.' });
    }

    if (isConnectedToMongo) {
      await Contact.findByIdAndDelete(id);
    } else {
      fallbackStore.contacts = fallbackStore.contacts.filter((c) => c._id !== id);
      saveFallbackStore();
    }

    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
