import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StartLearning = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { videoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/videos');
        const videoList = response.data;

        setVideos(videoList);

        // If videoId is invalid or missing, default to the first video
        const defaultVideo = {
            _id: "1-MkLYbVtDRYci_qJ5b5cTBrBh0x6cwIE", // Your default video ID
            title: "Introduction to Sign Language",
            googleDriveId: "1-MkLYbVtDRYci_qJ5b5cTBrBh0x6cwIE",
            description: "This video provides an introduction to sign language basics.",
            uploadDate: new Date().toISOString(),
            views: 0,
            thumbnailUrl: "/fallback-thumbnail.jpg",
            duration: "5:00",
          };
          
          const selectedVideo = videoList.find(v => v._id === videoId) || videoList[0] || defaultVideo;
          
        setCurrentVideo(selectedVideo);

        // If videoId is invalid, correct the URL
        if (!videoId && selectedVideo) {
          navigate(`/start-learning/${selectedVideo._id}`, { replace: true });
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [videoId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-purple-500 text-xl">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Header */}
      <header className="bg-gray-800 py-4 px-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-purple-500">Learning Hub - Video Lessons</h1>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Video Player */}
        <div className="md:w-3/4 p-6">
          {currentVideo ? (
            <div>
              <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                <iframe
                    src={`https://drive.google.com/file/d/${currentVideo?.googleDriveId}/preview`}
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                    title={currentVideo?.title}
                />
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold text-white">{currentVideo.title}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-400">
                    {currentVideo.views || 0} views • {new Date(currentVideo.uploadDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-300">{currentVideo.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
              <p className="text-gray-400">No videos available</p>
            </div>
          )}
        </div>

        {/* Sidebar - Video List */}
        <div className="md:w-1/4 bg-gray-800 p-4 overflow-y-auto max-h-screen">
          <h3 className="text-lg font-medium mb-4 text-purple-400">Related Videos</h3>
          <div className="space-y-4">
            {videos.map((video) => (
              <div
                key={video._id}
                onClick={() => navigate(`/learn/videos/${selectedVideo._id}`)} // Optimized navigation
                className={`flex cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition ${
                  currentVideo && currentVideo._id === video._id ? 'bg-gray-700 border-l-4 border-purple-500' : ''
                }`}
              >
                <div className="flex-shrink-0 w-24 h-16 bg-gray-700 rounded overflow-hidden">
                  <img
                    src={video.thumbnailUrl || '/fallback-thumbnail.jpg'}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{video.duration || 'Unknown Duration'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLearning;
