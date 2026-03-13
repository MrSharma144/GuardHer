import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Users, Plus, Trash2, Edit2, Phone, User as UserIcon, Loader2, X } from "lucide-react";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", phone_number: "", relation: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await api.get("/contacts/");
      setContacts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenModal = (contact = null) => {
    if (contact) {
      setFormData(contact);
    } else {
      setFormData({ id: null, name: "", phone_number: "", relation: "" });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (formData.id) {
        await api.put(`/contacts/${formData.id}/`, formData);
      } else {
        await api.post("/contacts/", formData);
      }
      await fetchContacts();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert("Failed to save contact.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await api.delete(`/contacts/${id}/`);
      await fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-offwhite tracking-tight flex items-center gap-3">
            <Users size={28} className="text-lavender" /> Safe Contacts
          </h2>
          <p className="text-offwhite/60 mt-1">These contacts will be instantly notified when you trigger an SOS alert.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-coral text-navy hover:bg-coral/90 transition-all font-bold px-4 py-2 rounded-xl shadow-lg hover:shadow-coral/20 cursor-pointer text-sm"
        >
          <Plus size={18} /> Add Contact
        </button>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-lavender w-10 h-10" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-midnight border border-charcoal rounded-3xl p-12 text-center flex flex-col items-center">
          <div className="bg-navy p-4 rounded-full mb-4 inline-block shadow-inner">
            <Users className="text-offwhite/30" size={48} />
          </div>
          <h3 className="text-xl font-semibold text-offwhite mb-2">No Contacts Yet</h3>
          <p className="text-offwhite/60 max-w-sm mb-6">Add trustworthy friends or family members to your emergency circle.</p>
          <button onClick={() => handleOpenModal()} className="text-coral font-semibold hover:underline">
            + Add your first contact
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-midnight border border-charcoal p-6 rounded-2xl hover:border-lavender/30 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-lavender font-bold">
                    {contact.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-offwhite leading-tight">{contact.name}</h3>
                    <span className="text-xs bg-navy text-offwhite/60 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {contact.relation || 'Contact'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(contact)} className="p-1.5 text-offwhite/50 hover:text-lavender transition-colors rounded-md hover:bg-navy cursor-pointer">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(contact.id)} className="p-1.5 text-offwhite/50 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10 cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-offwhite/80 font-medium">
                <Phone size={16} className="text-coral" />
                {contact.phone_number}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-midnight border border-charcoal rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-charcoal bg-navy/30">
              <h3 className="text-xl font-bold text-lavender">{formData.id ? 'Edit Contact' : 'New Contact'}</h3>
              <button onClick={handleCloseModal} className="text-offwhite/50 hover:text-offwhite cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-offwhite/80 block mb-1.5">Name</span>
                <div className="flex items-center bg-navy/50 border border-charcoal rounded-xl px-3 py-2.5 focus-within:border-lavender">
                  <UserIcon className="text-lavender/70 mr-2" size={18} />
                  <input required name="name" value={formData.name} onChange={handleChange} className="bg-transparent outline-none w-full text-offwhite" placeholder="Jane Doe" />
                </div>
              </label>
              
              <label className="block">
                <span className="text-sm font-medium text-offwhite/80 block mb-1.5">Phone Number</span>
                <div className="flex items-center bg-navy/50 border border-charcoal rounded-xl px-3 py-2.5 focus-within:border-lavender">
                  <Phone className="text-lavender/70 mr-2" size={18} />
                  <input required type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} className="bg-transparent outline-none w-full text-offwhite" placeholder="+1 (555) 000-0000" />
                </div>
              </label>

              <label className="block mb-6">
                <span className="text-sm font-medium text-offwhite/80 block mb-1.5">Relation (Optional)</span>
                <input name="relation" value={formData.relation} onChange={handleChange} className="w-full bg-navy/50 border border-charcoal rounded-xl px-4 py-2.5 text-offwhite focus:border-lavender outline-none" placeholder="Sister, Friend, etc." />
              </label>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={handleCloseModal} className="flex-1 bg-navy text-offwhite rounded-xl py-3 font-semibold hover:bg-navy/80 cursor-pointer">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 bg-coral text-navy rounded-xl py-3 font-bold hover:bg-coral/90 shadow-lg cursor-pointer">
                  {submitting ? 'Saving...' : 'Save Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
