import { Injectable } from '@nestjs/common';
import { FileDTO } from './upload.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {

    async upload(file:FileDTO){
        const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_API,{
            auth:{
                persistSession:false
            }
        })
        const data = await supabase.storage.from("image").upload(file.originalname, file.buffer,{
            upsert:true
        })
        return data
    }
}
