import { ethers } from 'ethers'
import CampaignFactory from '../../../contract_abi/CampaigFactory.json'

export const data= async ()=>{
    const myprovider= new ethers.providers.JsonRpcProvider(
        'https://polygon-mumbai.infura.io/v3/1d92f090fdc542a18b75377eb7357a45'
    )
    
    const mycontract= new ethers.Contract( 
        '0x39d762bFf030621Bce2C13BDA57A57601855890D',
        CampaignFactory.abi, 
         myprovider )

        const getAllContracts=mycontract.filters.createdCampaign()
        const ALlCampaign=await mycontract.queryFilter(getAllContracts)
        const Alldata=ALlCampaign.map((e)=>{
            return{
                title : e.args.title,
                required : e.args.requreAmount,
                owner : e.args.owner,
                image : e.args.imageUrl,
                time :e.args.timestamp,
            }})
            const getHealthContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Health')
            const HealthCampaign=await mycontract.queryFilter(getHealthContracts)
            const Healthdata=HealthCampaign.map((e)=>{
                return{
                    title : e.args.title,
                    required : e.args.requreAmount,
                    owner : e.args.owner,
                    image : e.args.imageUrl,
                    time :e.args.timestamp,
                }})

                const getEducationContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Education')
                const EducationCampaign=await mycontract.queryFilter(getEducationContracts)
                const Educationdata=EducationCampaign.map((e)=>{
                    return{
                        title : e.args.title,
                        required : e.args.requreAmount,
                        owner : e.args.owner,
                        image : e.args.imageUrl,
                        time :e.args.timestamp,
                    }})
            
                    const getAnimalContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Animal')
                    const AnimalCampaign=await mycontract.queryFilter(getAnimalContracts)
                    const Animaldata=AnimalCampaign.map((e)=>{
                        return{
                            title : e.args.title,
                            required : e.args.requreAmount,
                            owner : e.args.owner,
                            image : e.args.imageUrl,
                            time :e.args.timestamp,
                        }})   
                        
            return{
                Alldata,
                Healthdata,
                Educationdata,
                Animaldata
            }
        
}

const Event =  () => {
    // const myprovider= new ethers.providers.JsonRpcProvider(
    //     'https://polygon-mumbai.infura.io/v3/1d92f090fdc542a18b75377eb7357a45'
    // )
    
    // const mycontract= new ethers.Contract( 
    //     '0x39d762bFf030621Bce2C13BDA57A57601855890D',
    //     CampaignFactory.abi, 
    //      myprovider )

    //     const getAllContracts=mycontract.filters.createdCampaign()
    //     const ALlCampaign=await mycontract.queryFilter(getAllContracts)
    //     const Alldata=ALlCampaign.map((e)=>{
    //         return{
    //             title : e.args.title,
    //             required : e.args.requreAmount,
    //             owner : e.args.owner,
    //             image : e.args.imageUrl,
    //             time :e.args.timestamp,
    //         }
    //     }
    //     )

    const newdata=data();

            // const getHealthContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Health')
            // const HealthCampaign=await mycontract.queryFilter(getHealthContracts)
            // const Healthdata=HealthCampaign.map((e)=>{
            //     return{
            //         title : e.args.title,
            //         required : e.args.requreAmount,
            //         owner : e.args.owner,
            //         image : e.args.imageUrl,
            //         time :e.args.timestamp,
            //     }})

            //     const getEducationContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Education')
            //     const EducationCampaign=await mycontract.queryFilter(getEducationContracts)
            //     const Educationdata=EducationCampaign.map((e)=>{
            //         return{
            //             title : e.args.title,
            //             required : e.args.requreAmount,
            //             owner : e.args.owner,
            //             image : e.args.imageUrl,
            //             time :e.args.timestamp,
            //         }})
            
            //         const getAnimalContracts=mycontract.filters.createdCampaign(null,null,null,null,null,null,'Animal')
            //         const AnimalCampaign=await mycontract.queryFilter(getAnimalContracts)
            //         const Animaldata=AnimalCampaign.map((e)=>{
            //             return{
            //                 title : e.args.title,
            //                 required : e.args.requreAmount,
            //                 owner : e.args.owner,
            //                 image : e.args.imageUrl,
            //                 time :e.args.timestamp,
            //             }})

  return (
    <>
    <h1>
        {
          newdata[0].title
        }
        heloo wolrd
    </h1>
    </>
  )

}

export default Event

