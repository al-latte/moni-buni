import Wallet from "../models/wallet.model.js"

export const addWallet = async (request, response) => {
    try {
        const {title, balance, description, setAsDefault} = request.body
        const userId = request.user._id

        const wallet = await Wallet.findOne({title})

        if(wallet) {
            return response.status(400).json({error: "Wallet already exists"})
        }

        const newWallet = new Wallet({
            userId,
            title, 
            balance, 
            description, 
            setAsDefault
          });

        if(newWallet) {
            await newWallet.save();

            response.status(200).json({
                _id: newWallet._id,
                userId: newWallet.userId,
                title: newWallet.title,
                balance: newWallet.balance,
                description: newWallet.description,
                setAsDefault: newWallet.setAsDefault,
            })
        } else {
            return response.status(400).json({error: "Invalid wallet data"})
        }
       
    } catch (error) {
        console.log("Error in addWallet controller", error.message)
        return response.status(500).json({error: "Internal server error"})
    }
}

export const editWallet = async (request, response) => {
    try {
        const {title, balance, description, setAsDefault} = request.body
        const userId = request.user._id
        const {id} = request.params

        const wallet = await Wallet.findById(id)

        if(!wallet) {
            return response.status(404).json({ error: "wallet not found" });
        }

        if(wallet) {
            const updatedWallet = {
                title, 
                balance, 
                description, 
                setAsDefault
            }
            await Wallet.findByIdAndUpdate(id, updatedWallet, {new: true})
            
            response.status(200).json({
                _id: updatedWallet._id,
                userId: updatedWallet.userId,
                title: updatedWallet.title,
                balance: updatedWallet.balance,
                description: updatedWallet.description,
                setAsDefault: updatedWallet.setAsDefault,
            })
           
        } else {
            return response.status(400).json({error: "Invalid wallet data"})
        }
       
    } catch (error) {
        console.log("Error in editWallet controller", error.message)
        return response.status(500).json({error: "Internal server error"})
    }
}

export const deleteWallet = async (request, response) => {
    try {
        const { id } = request.params;
        const wallet = await Wallet.findByIdAndDelete(id);

        if (!wallet) {
            return response.status(404).json({ error: "wallet not found" });
        }
        
        return response.status(200).json({ message: "wallet deleted successfully" });

    } catch (error) {
        console.error("Error in deleteWallet controller", error.message);
        return response.status(500).json({ error: "Internal server error" });
    }
};

export const getWallets = async (request, response) => {
    try {
        const { userId } = request.params;

        const wallets = await Wallet.find({ userId });

        if (!wallets.length) {
            return response.status(404).json({ error: "User has no wallets" });
        }

        return response.status(200).json({ wallets });

    } catch (error) {
        console.error("Error in getwallets controller", error.message);
        return response.status(500).json({ error: "Internal server error" });
    }
};