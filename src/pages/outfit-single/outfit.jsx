import React, { useState , useEffect } from 'react'
import './outfit.css'
import { useParams } from 'react-router-dom';

const Outfit = () => {


    const dataJson = [
        {
          id: 1,
          name: 'Maharashtrian',
          desc: 'A beautiful traditional outfit that embodies cultural heritage.',
          image: 'http://localhost:5000/assets/outfit/maharashtra-main.png',
          images: [
     'http://localhost:5000/assets/outfit/M/1.png',
         'http://localhost:5000/assets/outfit/M/2.png',
         'http://localhost:5000/assets/outfit/M/3.png',
         'http://localhost:5000/assets/outfit/M/4.png',
         'http://localhost:5000/assets/outfit/M/5.png',
         'http://localhost:5000/assets/outfit/M/6.png',
         'http://localhost:5000/assets/outfit/M/7.png',
         'http://localhost:5000/assets/outfit/M/8.png',
          ],
          price: '50'
        },
        {
            id: 2,
            name: 'Punjabi',
            desc: 'A beautiful traditional outfit that embodies cultural heritage.',
            image: 'http://localhost:5000/assets/outfit/punjabi-main.png',
            images: [
              'https://example.com/image1-1.jpg',
              'https://example.com/image1-2.jpg',
              'https://example.com/image1-3.jpg'
            ],
            price: '50'
          },
        {
            id: 3,
            name: 'Gujrati',
            desc: 'A beautiful traditional outfit that embodies cultural heritage.',
            image: 'http://localhost:5000/assets/outfit/gujrati-main.png',
            images: [
              'https://example.com/image1-1.jpg',
              'https://example.com/image1-2.jpg',
              'https://example.com/image1-3.jpg'
            ],
            price: '50'
          },
          {
            id: 4,
            name: 'Kashmiri',
            desc: 'A beautiful traditional outfit that embodies cultural heritage.',
            image: 'http://localhost:5000/assets/outfit/kashmiri-main.png',
            images: [
              'https://example.com/image1-1.jpg',
              'https://example.com/image1-2.jpg',
              'https://example.com/image1-3.jpg'
            ],
            price: '50'
          },
          {
            id: 5,
            name: 'South-Indian',
            desc: 'A beautiful traditional outfit that embodies cultural heritage.',
            image: 'http://localhost:5000/assets/outfit/south-main.png',
            images: [
              'https://example.com/image1-1.jpg',
              'https://example.com/image1-2.jpg',
              'https://example.com/image1-3.jpg'
            ],
            price: '50'
          },
          {
            id: 6,
            name: 'Bengali',
            desc: 'A beautiful traditional outfit that embodies cultural heritage.',
            image:  'http://localhost:5000/assets/outfit/bengali-main.png',
            images: [
              'https://example.com/image1-1.jpg',
              'https://example.com/image1-2.jpg',
              'https://example.com/image1-3.jpg'
            ],
            price: '50'
          },
          {
            id: 7,
            name: 'Muslim',
            desc: 'A beautiful traditional outfit that embodies cultural heritage.',
            image:  'http://localhost:5000/assets/outfit/muslim-main.png',
            images: [
              'https://example.com/image1-1.jpg',
              'https://example.com/image1-2.jpg',
              'https://example.com/image1-3.jpg'
            ],
            price: '50'
          },
          {
            id: 8,
            name: 'Buddhist',
            desc: 'A beautiful traditional outfit that embodies cultural heritage.',
            image: 'http://localhost:5000/assets/outfit/buddhist-main.png',
            images: [
              'https://example.com/image1-1.jpg',
              'https://example.com/image1-2.jpg',
              'https://example.com/image1-3.jpg'
            ],
            price: '50'
          },
          {
            id: 9,
            name: 'Christian',
            desc: 'A beautiful traditional outfit that embodies cultural heritage.',
            image: 'http://localhost:5000/assets/outfit/christian-main.png',
            images: [
              'https://example.com/image1-1.jpg',
              'https://example.com/image1-2.jpg',
              'https://example.com/image1-3.jpg'
            ],
            price: '50'
          }
      ];

    const [outfit , setOutfit] = useState("");

    const params = useParams();
    const id = params.id;
  
    useEffect(() => {
        const outfitFound = dataJson.find((item) => Number(id) === item.id);
        setOutfit(outfitFound);
      }, [id, dataJson]);
    
      if (!outfit) {
        return <div>Outfit not found or loading...</div>;
      }


  return (

    <div className="O-main-div">
      <div className="O-right-div">
        <div className="ORD-title">
          <h2>{outfit.name}</h2>
          <p>{outfit.desc}</p>
        </div>
        <div className="ORD-imageGrid">
          {outfit.images.map((imgUrl, index) => (
            <div className="image-wrapper" key={index}>
              <img src={imgUrl} alt={`${outfit.name} ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="left-div">
        <div className="LD-TopHeading">
          <h1>Dress</h1>
          <h1>In</h1>
          <h1>Culture</h1>
        </div>
        <div className="book-now-sec">
          <h2 className="book-now-h2">Book Now !!</h2>
          <h3 className="book-now">Call us At </h3>
          <h3 className='book-now-sub'>11111111</h3>
          <h3 className="book-now">Mail Us At</h3>
          <h3 className='book-now-sub'> wedMeGood@contact.in</h3>
        </div>
      </div>
    </div>
  )
}

export default Outfit