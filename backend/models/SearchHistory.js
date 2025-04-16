import mongoose from 'mongoose';

const SearchHistorySchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim:true},
    searchHistory: [
        {
            query: {
                type: String, required:true , trim: true,
            },
            timestamp: { type: Date, default: Date.now}
        }
    ]

   
  },
  { timestamps: true }
);

//Add index for faster querying
SearchHistorySchema.index({email:1});
SearchHistorySchema.index({'searchHistory.timestammp': -1})

export default mongoose.model('SearchHistory', SearchHistorySchema);
