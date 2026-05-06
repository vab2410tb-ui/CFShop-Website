import mongoose, { Document, Schema, Model } from 'mongoose';
import slugify from 'slugify';

// 1. INTERFACE 
export interface IProduct extends Document {
  sku: string;
  slug: string;
  name: string;
  price: number;
  variants: {
    color?: string;
    colorCode?: string;
    stock: number;
    images: string[];
  }[];
  lifestyleImages: string[];
  category: 'espresso-machine' | 'grinder-machine' | 'coffee-beans' | 'accessories';
  brand: string;
  mainImage: string;
  detailImages: string[];
  description: {
    productFeatures: string[];
    introText: { title?: string; content?: string }[];
    middleBannerImage: string[];
    highlightFeatures: { title?: string; content?: string }[];
    essentialFeatures: { title?: string; content?: string }[];
  };
  inStock: boolean;
  techSpecs: {
    origin?: string;
    dimensions?: string;
    weight?: string;
    voltage?: string;
    wattage?: string;
    material?: string;
    amperage?: string;
    coffeeBoiler?: string;
    steamBoiler?: string;
    burrs?: string;
    hopperCapacity?: string;
    productivity?: string;
    grindAdjustment?: string;
    grindingSpeed?: string;
    programmableDose?: boolean;
    diameter?: string;
    distributionSideMaximumDepth?: string;
    tamperSideMaximumDepth?: string;
    ApproximateWeight?: string;
  };
}

// 2. Init SCHEMA
const productSchema = new Schema<IProduct>({
  sku: { type: String, required: true, unique: true, trim: true, uppercase: true, index: true },
  slug: { type: String, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  
  variants: [{
    color: { type: String },     
    colorCode: { type: String }, 
    stock: { type: Number, required: true, default: 0 }, 
    images: [{ type: String }]                   
  }],

  lifestyleImages: [{ type: String }],
  
  category: { 
    type: String, 
    required: true, 
    enum: ['espresso-machine', 'grinder-machine', 'coffee-beans', 'accessories'],
    index: true
  },
  
  brand: { type: String, default: "La Marzocco" },
  mainImage: { type: String },
  detailImages: [{ type: String }],

  description: { 
    productFeatures: { type: [String], default: [] },
    introText: [{ title: { type: String }, content: { type: String } }], 
    middleBannerImage: [{ type: String }], 
    highlightFeatures: [{ title: { type: String }, content: { type: String } }],
    essentialFeatures: [{ title: { type: String }, content: { type: String } }]
  },

  inStock: { type: Boolean, default: true },
  
  techSpecs: {
    origin: { type: String }, 
    dimensions: { type: String },
    weight: { type: String },
    voltage: { type: String },
    wattage: { type: String },
    material: { type: String },
    amperage: { type: String },
    coffeeBoiler: { type: String },
    steamBoiler: { type: String },
    burrs: { type: String },
    hopperCapacity: { type: String },
    productivity: { type: String },
    grindAdjustment: { type: String },
    grindingSpeed: { type: String },
    programmableDose: { type: Boolean },
    diameter: { type: String },
    distributionSideMaximumDepth: { type: String },
    tamperSideMaximumDepth: { type: String },
    ApproximateWeight: { type: String } 
  },
}, { timestamps: true });

// 3. MIDDLEWARE create SLUG
productSchema.pre('save', async function(this: IProduct) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true, 
      locale: 'vi' 
    });
  }
});

// 4. check Cache and Export Model with TYPE <IProduct>
const Product = (mongoose.models.Product as Model<IProduct>) || mongoose.model<IProduct>('Product', productSchema);

export default Product;