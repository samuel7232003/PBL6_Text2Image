import torch
from diffusers import StableDiffusionPipeline

# Định nghĩa tham số
rand_seed = torch.manual_seed(42)
NUM_INFERENCE_STEPS = 50
GUIDANCE_SCALE = 0.75
HEIGHT = 512
WIDTH = 512


def create_pipeline(model_name = "Daichi/realisticVisionV60B1_v51HyperVAE"):
    # Nếu máy có GPU CUDA
    if torch.cuda.is_available():
        print("Using GPU")
        pipeline = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype = torch.float16,
            use_safetensors = True
        ).to("cuda")
        lora_weight1 = "C:/Users/Huy/Documents/GitHub/PBL6_Text2Image/text2imageGen/model/noelLoraAI_v1-000006.safetensors"  # thêm lora tại đây
        lora_weight2 = "C:/Users/Huy/Documents/GitHub/PBL6_Text2Image/text2imageGen/model/vintageLoraAI.safetensors"
        lora_weight3 = "C:/Users/Huy/Documents/GitHub/PBL6_Text2Image/text2imageGen/model/modernLoraAI.safetensors"
        pipeline.load_lora_weights(lora_weight1)
        pipeline.load_lora_weights(lora_weight2)
        pipeline.load_lora_weights(lora_weight3)
    else:
        print("Using CPU")
        pipeline = StableDiffusionPipeline.from_pretrained(
            model_name,
            torch_dtype=torch.float32,
            use_safetensors=True
        )
    return pipeline

def text2img(prompt, pipeline):
    images = pipeline(
        prompt,
        guidance_scale = GUIDANCE_SCALE,
        num_inference_steps = NUM_INFERENCE_STEPS,
        generator = rand_seed,
        num_images_per_request = 1, # số lượng ảnh mà nó sinh ra trong 1 lần
        height = HEIGHT,
        width = WIDTH
    ).images

    return images[0]

