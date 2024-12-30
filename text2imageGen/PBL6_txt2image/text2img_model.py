import torch
from diffusers import StableDiffusionPipeline

# Định nghĩa tham số
rand_seed = torch.manual_seed(8)
NUM_INFERENCE_STEPS = 110
GUIDANCE_SCALE = 4
HEIGHT = 512
WIDTH = 512

# Daichi/realisticVisionV60B1_v51HyperVAE
def create_pipeline(model_name = "Daichi/realisticVisionV60B1_v51HyperVAE"):
    pipeline = []
    # Nếu máy có GPU CUDA
    if torch.cuda.is_available():
        print("Using GPU")
        pipeline_vintage = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            use_safetensors=True
        ).to("cuda")
        pipeline_vintage.load_lora_weights("C:/Users/Administrator/Desktop/pbl6_final_project/model_final/1.vintage/Model/vintageLoraCf.safetensors")

        pipeline_modern = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype = torch.float16,
            use_safetensors = True
        ).to("cuda")
        pipeline_modern.load_lora_weights("C:/Users/Administrator/Desktop/pbl6_final_project/model_final/2.modern/Model/modernLoraAI.safetensors")

        pipeline_noel = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            use_safetensors=True
        ).to("cuda")
        pipeline_noel.load_lora_weights("C:/Users/Administrator/Desktop/pbl6_final_project/model_final/3.noel/Model/noelLoraAI_v1-000006.safetensors")

        pipeline_tet = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            use_safetensors=True
        ).to("cuda")
        pipeline_tet.load_lora_weights("C:/Users/Administrator/Desktop/pbl6_final_project/model_final/4.tet/Model/tetLoraAI-000009.safetensors")

        pipeline_haloween = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            use_safetensors=True
        ).to("cuda")
        pipeline_haloween.load_lora_weights("C:/Users/Administrator/Desktop/pbl6_final_project/model_final/5.haloween/Model/haloweenLoraAI-000014.safetensors")

        pipeline_none = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            use_safetensors=True
        ).to("cuda")
        pipeline.append(pipeline_none)
        pipeline.append(pipeline_vintage)
        pipeline.append(pipeline_modern)
        pipeline.append(pipeline_noel)
        pipeline.append(pipeline_tet)
        pipeline.append(pipeline_haloween)
    else:
        print("Using CPU")
        pipeline = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype=torch.float32,
            use_safetensors=True
        )
    return pipeline

def text2img(prompt,style, pipeline):
    if(style == "vintage"):
        print(style)
        images = pipeline[1](
            prompt,
            guidance_scale = GUIDANCE_SCALE,
            num_inference_steps = 130,
            generator = rand_seed,
            num_images_per_request = 1, # số lượng ảnh mà nó sinh ra trong 1 lần
            height = HEIGHT,
            width = WIDTH
        ).images
    elif(style == "modern"):
        print(style)
        images = pipeline[2](
            prompt,
            guidance_scale=GUIDANCE_SCALE,
            num_inference_steps=150,
            generator=torch.manual_seed(42),
            num_images_per_request=1,  # số lượng ảnh mà nó sinh ra trong 1 lần
            height=HEIGHT,
            width=WIDTH
        ).images
    elif(style == "noel"):
        print(style)
        images = pipeline[3](
            prompt,
            guidance_scale=GUIDANCE_SCALE,
            num_inference_steps=NUM_INFERENCE_STEPS,
            generator=rand_seed,
            num_images_per_request=1,  # số lượng ảnh mà nó sinh ra trong 1 lần
            height=HEIGHT,
            width=WIDTH
        ).images
    elif(style == "tet"):
        print(style)
        images = pipeline[4](
            prompt,
            guidance_scale=GUIDANCE_SCALE,
            num_inference_steps=NUM_INFERENCE_STEPS,
            generator=rand_seed,
            num_images_per_request=1,  # số lượng ảnh mà nó sinh ra trong 1 lần
            height=HEIGHT,
            width=WIDTH
        ).images
    elif (style == "halloween"):
        images = pipeline[5](
            prompt,
            guidance_scale=GUIDANCE_SCALE,
            num_inference_steps=NUM_INFERENCE_STEPS,
            generator=rand_seed,
            num_images_per_request=1,  # số lượng ảnh mà nó sinh ra trong 1 lần
            height=HEIGHT,
            width=WIDTH
        ).images
    else:
        images = pipeline[0](
            prompt,
            guidance_scale=GUIDANCE_SCALE,
            num_inference_steps=NUM_INFERENCE_STEPS,
            generator=rand_seed,
            num_images_per_request=1,  # số lượng ảnh mà nó sinh ra trong 1 lần
            height=HEIGHT,
            width=WIDTH
        ).images

    return images[0]

