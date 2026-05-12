'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutTemplate,
  Upload,
  Globe,
  Image as ImageIcon,
  Layers3,
  Sparkles,
  Rocket,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../../services/api';

const categories = [
  'Portfolio',
  'Business',
  'Restaurant',
  'Ecommerce',
  'Agency',
  'SaaS',
  'Real Estate',
  'Landing Page',
  'Education',
  'Healthcare',
];

export default function AdminTemplatesPage() {

  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState([]);

  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    previewImage: '',
    livePreviewUrl: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const fetchTemplates = async () => {
  try {

    const { data } = await api.get('/admin/templates');

    setTemplates(data.templates);

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchTemplates();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

        await api.post('/admin/templates', form);

      toast.success('Project uploaded successfully');
      fetchTemplates();

      setForm({
        name: '',
        category: '',
        description: '',
        previewImage: '',
        livePreviewUrl: '',
      });

    } catch (error) {
      console.log(error);
      toast.error('Upload failed');

    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
  try {

    await api.delete(`/admin/templates/${id}`);

    toast.success('Project deleted');

    fetchTemplates();

  } catch (error) {

    console.log(error);

    toast.error('Delete failed');
  }
};

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative overflow-hidden grid-pattern">

      {/* Background Blobs */}
      <div className="blob blob-indigo w-[500px] h-[500px] -left-52 top-10 opacity-10" />
      <div className="blob blob-purple w-[450px] h-[450px] right-0 bottom-0 opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >

          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-indigo-500/20 mb-5">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">
              TechKidyy Showcase Manager
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            Upload Your
            <span className="gradient-text"> Project Showcase</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl">
            Publish your latest professional projects and showcase them publicly
            on your templates gallery with modern presentation.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >

            <div className="glass-card">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/20">
                <Rocket className="w-7 h-7 text-white" />
              </div>

              <h2 className="text-xl font-bold text-white mb-3">
                Professional Showcase
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed">
                Add high-quality projects to your public portfolio and impress
                potential clients with modern UI and premium presentation.
              </p>
            </div>

            <div className="glass-card">
              <h3 className="text-lg font-semibold text-white mb-5">
                Showcase Tips
              </h3>

              <div className="space-y-4">

                {[
                  'Use high-quality preview images',
                  'Add clean project descriptions',
                  'Provide live preview links',
                  'Choose accurate categories',
                  'Highlight unique features',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1" />

                    <p className="text-sm text-gray-400">
                      {item}
                    </p>
                  </div>
                ))}

              </div>
            </div>

          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >

            <form
              onSubmit={handleSubmit}
              className="glass-card space-y-6"
            >

              {/* Project Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Project Name
                </label>

                <div className="relative">
                  <LayoutTemplate className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Modern Restaurant Website"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="input-field pl-12"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Project Category
                </label>

                <div className="relative">
                  <Layers3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400 z-10" />

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="input-field pl-12"
                  >
                    <option value="">
                      Select Category
                    </option>

                    {categories.map((cat) => (
                      <option
                        key={cat}
                        value={cat}
                      >
                        {cat}
                      </option>
                    ))}

                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Project Description
                </label>

                <textarea
                  name="description"
                  placeholder="Describe your project, features, technologies and business goals..."
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="input-field h-36 resize-none"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Preview Image URL
                </label>

                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" />

                  <input
                    type="text"
                    name="previewImage"
                    placeholder="https://your-image-url.com/image.png"
                    value={form.previewImage}
                    onChange={handleChange}
                    required
                    className="input-field pl-12"
                  />
                </div>
              </div>

              {/* Live URL */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Live Preview URL
                </label>

                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />

                  <input
                    type="text"
                    name="livePreviewUrl"
                    placeholder="https://project-demo.vercel.app"
                    value={form.livePreviewUrl}
                    onChange={handleChange}
                    required
                    className="input-field pl-12"
                  />
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-white flex items-center justify-center gap-2 disabled:opacity-70"
              >

                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Publish Project Showcase
                  </>
                )}

              </button>

            </form>
            <div className="mt-14">

                <h2 className="text-3xl font-bold text-white mb-8">
                     Uploaded Projects
                </h2>

             <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                 {templates.map((item) => (

                 <div
                      key={item._id}
                         className="glass-card overflow-hidden"
                     >

                    <img
                         src={item.previewImage}
                         alt={item.name}
                         className="w-full h-52 object-cover rounded-xl mb-5"
                        />

                    <h3 className="text-xl font-bold text-white mb-2">
                        {item.name}
                    </h3>

                 <p className="text-indigo-400 text-sm mb-3">
                        {item.category}
                 </p>

        <p className="text-gray-400 text-sm mb-5">
          {item.description}
        </p>

        <div className="flex gap-3">

          <a
            href={item.livePreviewUrl}
            target="_blank"
            className="flex-1 py-2 rounded-xl bg-indigo-600 text-center text-white hover:bg-indigo-700 transition-all"
          >
            Preview
          </a>

          <button
            onClick={() => deleteProject(item._id)}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
          >
            Delete
          </button>

        </div>

      </div>

    ))}

  </div>

</div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}